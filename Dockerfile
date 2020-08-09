###--- STAGE 1 - Builder ---###
FROM node:12-alpine as BUILD
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

###--- STAGE 2 - Production ---###
FROM node:12-alpine as PROD 
ENV NODE_ENV=prod
WORKDIR /usr/src/app
COPY --from=BUILD /usr/src/app/package*.json ./
COPY --from=BUILD /usr/src/app/dist ./dist
RUN npm run install:prod
ENTRYPOINT ["node", "/usr/src/app/dist/index.js"]
EXPOSE 3000
