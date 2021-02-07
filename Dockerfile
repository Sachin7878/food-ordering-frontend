FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./output/dist /usr/share/nginx/html