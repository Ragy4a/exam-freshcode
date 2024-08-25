ARG VERSION=lts-alpine

FROM node:$VERSION

ARG NODE_ENV="development"

RUN mkdir -p /server /public/images /var/www/html/images \
    && chown -R node:node /server /public/images /var/www/html/images

WORKDIR /server

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN chown -R node:node /server/node_modules

EXPOSE 3000

CMD ["npm", "start"]