
FROM node:20-slim AS base

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN ./node_modules/.bin/prisma generate

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN groupadd --gid 1001 nodejs
RUN useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nextjs

COPY --from=builder /app/public ./public

# Set correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma schema and migrations if needed for runtime
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
# We might need to run migration/push at runtime or use volume for sqlite

USER nextjs

EXPOSE 3000

ENV PORT 3000
# Update HOST to 0.0.0.0 for Docker
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
