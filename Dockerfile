FROM node:14-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY src/ src/
COPY bin/ bin/

RUN npm install

ENTRYPOINT ["/app/bin/holo"]
