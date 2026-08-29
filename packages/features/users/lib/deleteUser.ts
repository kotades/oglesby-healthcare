import prisma from "@calcom/prisma";
import type { User } from "@calcom/prisma/client";

async function deleteStripeCustomer(_user: Pick<User, "id" | "email" | "metadata">) {
  // Stripe customer deletion no-op
}

export async function deleteUser(user: Pick<User, "id" | "email" | "metadata">) {
  await deleteStripeCustomer(user).catch(console.warn);
  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });
}
