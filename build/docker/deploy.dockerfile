ARG BUILD_IMAGE
FROM "$BUILD_IMAGE"
ARG GIT_COMMIT_HASH
ARG NPM_AUTH_TOKEN
RUN yarn run build-cli prepare-npmrc \
      --npmrc_path="./.npmrc" \
      --auth_token="${NPM_AUTH_TOKEN}" \
      --org_email="info@bimeister.com" \
      --registry="https://git.bimeister.com/api/v4/projects/98/packages/npm/" \
      --remove_scoped_registries="true" \
 && cp ./.npmrc ./.npmignore --target-directory ./dist/ \
  \
 && cp ./package.json ./LICENSE --target-directory ./dist/ \
 && yarn run build-cli prepare-package-json \
      --commit_hash="${GIT_COMMIT_HASH}" \
      --package_json_path="./dist/package.json" \
      --main_js_path="bundles/index.js" \
      --module="esm2015/index.js" \
      --esm2015="esm2015/index.js" \
      --typings="lib/index.d.ts" \
      --sideEffects="false"
RUN npm publish ./dist/ --tag="latest" --access="public"
