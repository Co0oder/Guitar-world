# production development

FROM node:12.10-alpine as builder
WORKDIR /usr/src/app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
EXPOSE 3000
COPY package*.json ./
COPY . .
RUN npm install -g @nestjs/cli \
    && npm ci \
    && npm run build
CMD [ "npm", "run", "start" ]
