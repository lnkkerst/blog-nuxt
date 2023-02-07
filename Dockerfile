FROM node:16-alpine as build-stage

WORKDIR /app
RUN corepack enable

COPY .npmrc package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:16-alpine as production-stage

COPY --from=build-stage /app/.output /app
EXPOSE 80

CMD ["node", "/app/server/index.mjs"]
