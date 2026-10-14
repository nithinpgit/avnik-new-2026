# syntax=docker/dockerfile:1
FROM nginx:1.27-alpine
COPY routes.conf /etc/nginx/conf.d/default.conf
EXPOSE 7000
CMD ["nginx", "-g", "daemon off;"]
