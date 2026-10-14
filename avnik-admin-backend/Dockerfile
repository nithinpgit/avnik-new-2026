# syntax=docker/dockerfile:1
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force
COPY . .
RUN mkdir -p app/uploads
EXPOSE 8081
CMD ["node", "server.js"]
