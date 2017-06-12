FROM mhart/alpine-node:8
MAINTAINER Agustin Carrasco <asermax@gmail.com>

WORKDIR /opt/app
ADD dist ./dist
ADD index.js package.json yarn.lock ./

VOLUME /opt/app/node_modules

ENV NODE_ENV production
ENTRYPOINT ["yarn"]
CMD ["start-prod"]
