FROM node:12.22.1

WORKDIR /app

ADD . /app

RUN npm i