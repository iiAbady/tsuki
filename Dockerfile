FROM node:10-alpine

LABEL name "Tsuki"
LABEL version "1.0.0"
LABEL maintainer "Abady <gamersspeaks@gmail.com>"

WORKDIR /usr/src/tsuki

COPY package.json yarn.lock ./

RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps git curl build-base python g++ make \
&& yarn install \
&& apk del .build-deps

COPY . .

ENV NODE_ENV= \
	ID= \
	OWNERS= \
	TOKEN= \
	LAVALINK_PASSWORD= \
	LAVALINK_REST= \
	LAVALINK_WS= \
	DB= \
	REDIS= \
	RAVEN=

CMD ["node", "src/tsuki.js"]
