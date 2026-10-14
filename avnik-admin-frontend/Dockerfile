# syntax=docker/dockerfile:1
FROM node:18-alpine AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund
COPY . .
ARG VITE_API_BASE_URL=
ARG VITE_IMAGE_BASE_URL=
ARG VITE_MEETING_FRONT_URL=
ARG VITE_MEETING_API_URL=
ARG VITE_APP_BASE_PATH=/admin
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_IMAGE_BASE_URL=${VITE_IMAGE_BASE_URL}
ENV VITE_MEETING_FRONT_URL=${VITE_MEETING_FRONT_URL}
ENV VITE_MEETING_API_URL=${VITE_MEETING_API_URL}
ENV VITE_APP_BASE_PATH=${VITE_APP_BASE_PATH}
RUN npm run build

FROM nginx:1.27-alpine AS production
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
