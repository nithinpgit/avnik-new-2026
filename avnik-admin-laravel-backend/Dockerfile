# syntax=docker/dockerfile:1
FROM node:18-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json webpack.mix.js ./
COPY resources ./resources
COPY public/assets ./public/assets

RUN npm install --legacy-peer-deps --no-audit --no-fund \
    && npm run production

FROM php:8.0-fpm-alpine AS app

WORKDIR /app

RUN apk add --no-cache \
    curl \
    nginx \
    libpng \
    libjpeg-turbo \
    freetype \
    libzip \
    && apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev

RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    zip \
    bcmath \
    && docker-php-ext-configure gd --with-jpeg --with-freetype \
    && docker-php-ext-install gd

RUN apk del .build-deps

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY composer.json composer.lock ./
COPY database/seeds ./database/seeds
COPY database/factories ./database/factories
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts --no-autoloader

COPY . .

RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

COPY --from=frontend /app/public/js ./public/js
COPY --from=frontend /app/public/css ./public/css
COPY --from=frontend /app/chunks ./public/chunks

RUN ln -sfn . /app/public/public \
    && ln -sfn ../storage /app/public/storage \
    && if [ -f public/assets/js/bootstrap.min.js ] && [ ! -f public/js/bootstrap.min.js ]; then \
      cp public/assets/js/bootstrap.min.js public/js/bootstrap.min.js; \
    fi

RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache \
    && chmod -R 775 /app/storage /app/bootstrap/cache

COPY nginx-laravel.conf /etc/nginx/http.d/default.conf
COPY docker-entrypoint.prod.sh /docker-entrypoint.prod.sh
COPY docker/setup-public-path.sh /docker/setup-public-path.sh
COPY docker/setup-storage-link.sh /docker/setup-storage-link.sh
COPY docker/render-laravel-env.sh /docker/render-laravel-env.sh
COPY docker/sync-passport-env.php /docker/sync-passport-env.php
RUN chmod +x /docker-entrypoint.prod.sh /docker/setup-public-path.sh /docker/setup-storage-link.sh /docker/render-laravel-env.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.prod.sh"]
