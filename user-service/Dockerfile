FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run tsoa:routes
RUN npm run build

FROM node:22-alpine

WORKDIR /app
COPY package*.json .
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma