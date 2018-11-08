FROM node:latest

ENV MONGO_URL="db"

RUN npm install -g nodemon


WORKDIR /usr/src/app
COPY platform /usr/src/app

WORKDIR /usr/src/app/platform
RUN npm install

WORKDIR /usr/src/app/platform/react-src
RUN npm install


EXPOSE 3000
