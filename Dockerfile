FROM node:18-alphine as base

ADD ./ /opt/app
WORKDIR /opt/app

USER root
RUN rm -rf node_modules && chown -R node /opt/app

USER node

FROM base as build

USER root
RUN npm install -g nodemon && npm install && chown -R node /opt/app

USER node

ENTRYPOINT ts-node -r tsconfig-paths/register ./src/server.ts