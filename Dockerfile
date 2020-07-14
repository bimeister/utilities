FROM node:13-slim as build-utilities
RUN apt update && apt-get install jq -y

WORKDIR /docker/build-utilities

COPY yarn.lock package.json .npmrc /docker/build-utilities/
RUN yarn install --frozen-lockfile

COPY . /docker/build-utilities
RUN yarn run lint:inspect \
 && yarn run prettier:check \
 && yarn run build:ci

ENTRYPOINT ["scripts/publish.sh"]
