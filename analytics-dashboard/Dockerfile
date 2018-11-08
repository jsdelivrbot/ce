FROM node:latest

ENV MONGO_URL="db"

WORKDIR /usr/src/app
RUN npm install -g nodemon

COPY . /usr/src/app
RUN npm install

EXPOSE 5000

