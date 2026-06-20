FROM node:24-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

FROM base AS development

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM base AS build

RUN npm ci

COPY . .

RUN npm run typecheck
RUN npm run build

FROM base AS production-dependencies

RUN npm ci --omit=dev

FROM node:24-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=production-dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json package-lock.json ./

USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]
