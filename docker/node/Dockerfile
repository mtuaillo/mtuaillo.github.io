FROM node:19.3.0-buster-slim

RUN mkdir -p /var/www/nuxt-app
WORKDIR /var/www/nuxt-app

RUN yarn install

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "yarn", "dev" ]
