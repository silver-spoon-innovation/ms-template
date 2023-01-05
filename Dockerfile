FROM node:16-alpine3.17 as base

ADD ./ /opt/app
WORKDIR /opt/app

USER root
RUN rm -rf node_modules && chown -R node /opt/app

USER node

FROM base as build

USER root
RUN npm install -g nodemon && npm install && chown -R node /opt/app

USER node

ENTRYPOINT ./shell/run-db-migration.sh && npx ts-node ./src/server.ts