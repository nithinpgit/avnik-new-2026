# syntax=docker/dockerfile:1
# Production image: compile TypeScript, run mediasoup worker (prebuilt binary for linux).
FROM node:22-bookworm-slim AS build
WORKDIR /app

# mediasoup postinstall downloads a prebuilt worker from GitHub (needs ca-certificates).
# If download fails it builds locally (needs meson/ninja and build tools).
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    python3 \
    python3-pip \
    build-essential \
    meson \
    ninja-build \
    pkg-config \
    libssl-dev \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --no-fund
COPY tsconfig.json ./
COPY src ./src
RUN npm run build && npm prune --omit=dev

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init \
  && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
# Host network (compose network_mode: host): binds PORT + RTC range on the host as this user.
USER node
EXPOSE 3001/tcp
# RTP range (must match MEDIASOUP_RTC_* and host/K8s published ports)
EXPOSE 40000-40100/udp
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
