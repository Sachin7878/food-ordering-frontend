FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./output/dist /usr/share/nginx/html
## Set the permission for NGINX web folder
RUN chmod 777 -R /usr/share/nginx/html
## Overwrit the default NGINX config using the custom config file
COPY ./custom-nginx-file.conf /etc/nginx/conf.d/default.conf