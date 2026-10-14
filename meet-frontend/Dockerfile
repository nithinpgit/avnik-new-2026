# syntax=docker/dockerfile:1
FROM node:22-alpine AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --no-fund
COPY . .
# Build-time only (Vite).
ARG VITE_MEDIA_SOCKET_PATH=/mediasoup-socket.io
ARG VITE_MEDIA_WS_PATH=/mediasoup-socket.io
ARG VITE_TURN_URLS=
ARG VITE_TURN_USERNAME=
ARG VITE_TURN_PASSWORD=
ENV VITE_MEDIA_SOCKET_PATH=${VITE_MEDIA_SOCKET_PATH}
ENV VITE_MEDIA_WS_PATH=${VITE_MEDIA_WS_PATH}
ENV VITE_TURN_URLS=${VITE_TURN_URLS}
ENV VITE_TURN_USERNAME=${VITE_TURN_USERNAME}
ENV VITE_TURN_PASSWORD=${VITE_TURN_PASSWORD}
RUN npm run build

FROM nginx:1.27-alpine AS production
# Alpine nginx mime.types has no .mjs — pdf.js worker fails without this
RUN sed -i 's/\(\s\)js;/\1js mjs;/' /etc/nginx/mime.types
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
