import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";
import { parseRequestData } from "app/api/parseRequestData";
import { NextResponse, type NextRequest } from "next/server";

import calcomSignupHandler from "./handlers/calcomSignupHandler";
import selfHostedSignupHandler from "./handlers/selfHostedHandler";
import { FeaturesRepository } from "@calcom/features/flags/features.repository";
import { checkRateLimitAndThrowError } from "@calcom/lib/checkRateLimitAndThrowError";
import { IS_PREMIUM_USERNAME_ENABLED } from "@calcom/lib/constants";
import getIP from "@calcom/lib/getIP";
import { HttpError } from "@calcom/lib/http-error";
import logger from "@calcom/lib/logger";
import { piiHasher } from "@calcom/lib/server/PiiHasher";
import { checkCfTurnstileToken } from "@calcom/lib/server/checkCfTurnstileToken";
import { prisma } from "@calcom/prisma";
import { signupSchema } from "@calcom/prisma/zod-utils";

async function ensureSignupIsEnabled(body: Record<string, string>) {
  const { token } = signupSchema
    .pick({
      token: true,
    })
    .parse(body);

  // Still allow signups if there is a team invite
  if (token) return;

  const featuresRepository = new FeaturesRepository(prisma);
  const signupDisabled = await featuresRepository.checkIfFeatureIsEnabledGlobally("disable-signup");

  if (process.env.NEXT_PUBLIC_DISABLE_SIGNUP === "true" || signupDisabled) {
    throw new HttpError({
      statusCode: 403,
      message: "Signup is disabled",
    });
  }
}

import { ZodError } from "zod";

async function handler(req: NextRequest) {
  const remoteIp = getIP(req);
  // Use a try catch instead of returning res every time
  try {
    // Rate limit: 10 signups per 60 seconds per IP
    await checkRateLimitAndThrowError({
      rateLimitingType: "core",
      identifier: `api:signup:${piiHasher.hash(remoteIp)}`,
    });

    const body = await parseRequestData(req);
    const query = Object.fromEntries(req.nextUrl.searchParams.entries());
    await checkCfTurnstileToken({
      token: req.headers.get("cf-access-token") as string,
      remoteIp,
    });

    await ensureSignupIsEnabled(body);

    if (IS_PREMIUM_USERNAME_ENABLED) {
      return await calcomSignupHandler(body, query);
    }

    return await selfHostedSignupHandler(body);
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json({ message: e.message }, { status: e.statusCode });
    }
    if (e instanceof ZodError) {
      return NextResponse.json(
        { message: e.errors[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }
    logger.error(e);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export const POST = defaultResponderForAppDir(handler);
