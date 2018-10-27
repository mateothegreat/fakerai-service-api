FROM node:10-alpine

WORKDIR /app

RUN chown -R node /app

USER node

COPY . .

RUN npm install

ENTRYPOINT ["node", "server.js"]
