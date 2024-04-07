FROM node:16-alpine AS build-stage

WORKDIR /app
RUN corepack enable

COPY .npmrc package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:16-alpine AS production-stage

COPY --from=build-stage /app/.output /app
ENV PORT=80
EXPOSE 80

CMD ["node", "/app/server/index.mjs"]
