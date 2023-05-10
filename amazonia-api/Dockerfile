FROM node:18-alpine AS BUILDER

WORKDIR /app

## Install dependencies
COPY ["./package.json", "./yarn.lock", "/app/"]

RUN yarn --frozen-lockfile

## Add source code
COPY ["./tsconfig.json", "/app/"]
COPY "./src" "/app/src/"

## Build
RUN yarn build

# PRODUCTION IMAGE

FROM node:18-alpine

WORKDIR /app

COPY --from=BUILDER [\
  "/app/package.json", \
  "/app/yarn.lock", \
  "/app/" \
  ]

COPY --from=BUILDER "/app/build" "/app/build/"

COPY ".env" "/app/"

RUN yarn --frozen-lockfile --production

EXPOSE 8080

CMD [ "yarn", "start" ]
