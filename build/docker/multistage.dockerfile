# base image with dependencies
FROM node:current-slim as base
ARG NPM_AUTH_TOKEN
WORKDIR /temporary
COPY .npmrc package.json yarn.lock ./
RUN echo "@bimeister:registry = https://git.bimeister.com/api/v4/packages/npm/" >> .npmrc \
 && echo "//git.bimeister.com/api/v4/projects/:_authToken = ${NPM_AUTH_TOKEN}" >> .npmrc \
 && echo "//git.bimeister.com/api/v4/packages/npm/:_authToken = ${NPM_AUTH_TOKEN}" >> .npmrc
RUN yarn install --frozen-lockfile \
  && mkdir --parents /base \
  && cp --archive /temporary/node_modules /base
WORKDIR /base
COPY . .

# image with built static files
FROM base as build
ARG NPM_AUTH_TOKEN
COPY . .
RUN yarn run build:ci

# image for linting
FROM base as lint
ARG NPM_AUTH_TOKEN
COPY . .
RUN yarn run lint:inspect \
 && yarn run prettier:check

# image for testing
FROM base as test
ARG NPM_AUTH_TOKEN
COPY . .
RUN yarn run test:ci

# image with built static files
FROM base as docs
ARG NPM_AUTH_TOKEN
COPY . .
RUN yarn run build:docs

# image for deploy
FROM build as deploy
ARG GIT_COMMIT_HASH
ARG NPM_AUTH_TOKEN
COPY . .
RUN yarn run build-cli prepare-npmrc \
      --npmrc_path="./.npmrc" \
      --auth_token="${NPM_AUTH_TOKEN}" \
      --org_email="info@bimeister.com" \
      --registry="https://git.bimeister.com/api/v4/projects/13/packages/npm/" \
      --remove_scoped_registries="true" \
 && cp ./.npmrc ./.npmignore --target-directory ./dist/ \
  \
 && cp ./package.json ./LICENSE --target-directory ./dist/ \
 && yarn run build-cli prepare-package-json \
      --commit_hash="${GIT_COMMIT_HASH}" \
      --package_json_path="./dist/package.json"
RUN npm publish ./dist/ --tag="latest" --access="public"
