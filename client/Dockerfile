ARG VERSION=lts-alpine
FROM node:$VERSION

ARG NODE_ENV="development"

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --only=production

COPY --chown=node:node . .

USER node

EXPOSE 5000

CMD ["npm", "start"]