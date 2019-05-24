# PRODUCTION STAGE
FROM node:8.12-slim as NODE_PROD

WORKDIR /app

ENV NODE_ENV production

COPY ./package.json .
# COPY ./package-lock.json .

RUN npm install --production

COPY . /app

EXPOSE 3001

CMD [ "npm", "run", "start" ]

# DEVELOPMENT STAGE
FROM node:8.12 as NODE_DEV

WORKDIR /app

COPY --from=NODE_PROD /app .

RUN npm install

CMD [ "npm", "run","dev" ]