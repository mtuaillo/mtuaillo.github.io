FROM node:22.17.0-bookworm-slim

RUN mkdir -p /var/www/nuxt-app
WORKDIR /var/www/nuxt-app

COPY . /var/www/nuxt-app/
RUN yarn install

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "yarn", "dev" ]
