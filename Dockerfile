
ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine as base

# Update APK repositories and install Yarn
RUN apk update && apk add yarn

WORKDIR /usr/src/app
EXPOSE 3000

FROM base as dev

COPY package.json yarn.lock ./

RUN apk add --no-cache libc6-compat libstdc++ \
    && yarn add @next/swc-linux-x64-musl --optional \
    && yarn install

COPY . .
CMD yarn dev

FROM base as prod

COPY package.json yarn.lock ./

RUN apk add --no-cache libc6-compat libstdc++ \
    && yarn add @next/swc-linux-x64-musl --optional \
    && yarn install
COPY . .
RUN yarn build
CMD yarn start 
