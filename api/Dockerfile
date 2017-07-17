FROM node:8.1.2-alpine
MAINTAINER Agustin Carrasco <asermax@gmail.com>

WORKDIR /opt/app
ADD dist ./dist
ADD index.js package.json yarn.lock ./
ADD entrypoint.sh ./

VOLUME /opt/app/node_modules

ENV NODE_ENV production
ENTRYPOINT ["/opt/app/entrypoint.sh"]
CMD ["start-prod"]
