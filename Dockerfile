FROM nginx:1.12-alpine
MAINTAINER Agustin Carrasco <asermax@gmail.com>

ADD frontend/dist /usr/share/nginx/html
ADD nginx.prod.conf /etc/nginx/conf.d/default.conf
