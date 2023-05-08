# BUILD
FROM node:18 AS BUILD

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .

RUN yarn build


# FINAL IMAGE
FROM node:18

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production
COPY . .
COPY --from=BUILD /app/build .
EXPOSE 3000

CMD [ "node", "build/index.js" ]