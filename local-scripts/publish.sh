#!/bin/bash

set -e
set -u

TARGET_VERSION="0.1.0-${PKG_VERSION}";
UTILITIES_DIR=deploy
PACKAGE_JSON=${UTILITIES_DIR}/package.json
TEMP_JSON=${UTILITIES_DIR}/temp.json

cat ${PACKAGE_JSON} | jq ".version=\"${TARGET_VERSION}\"" > ${TEMP_JSON}
mv ${TEMP_JSON} ${PACKAGE_JSON}
npx npm-cli-login -u ${NPM_REPOSITORY_LOGIN} -p ${NPM_REPOSITORY_PASSWORD} -e ${NPM_REPOSITORY_EMAIL} -r ${NPM_REPOSITORY_URL}
npm publish ${UTILITIES_DIR} --registry "${NPM_REPOSITORY_URL}" --tag "${PKG_TAG}" --tag "latest"
