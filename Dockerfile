FROM node:16 as base

ADD ./ /opt/app
WORKDIR /opt/app

USER root
RUN rm -rf node_modules combined.log error.log && chown -R node /opt/app

USER node

FROM base as build

USER root
RUN npm install -g nodemon ts-node && npm install && chown -R node /opt/app

USER node

ENTRYPOINT ts-node -r tsconfig-paths/register ./src/server.ts