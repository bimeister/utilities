ARG BASE_IMAGE
FROM "$BASE_IMAGE"
RUN yarn run build:docs
COPY . .
