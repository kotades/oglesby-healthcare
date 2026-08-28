#!/bin/bash
echo "secret_nextauth_oglesby_key_123" | vercel env add NEXTAUTH_SECRET production,preview --yes
echo "secret_calendso_oglesby_key_123" | vercel env add CALENDSO_ENCRYPTION_KEY production,preview --yes
echo "https://oglesby.vercel.app" | vercel env add NEXT_PUBLIC_WEBAPP_URL production,preview --yes
echo "https://oglesby.vercel.app/api/v2" | vercel env add NEXT_PUBLIC_API_V2_URL production,preview --yes
