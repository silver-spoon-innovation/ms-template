FROM node:16 as base

ADD ./ /opt/app
WORKDIR /opt/app

USER root
RUN rm -rf node_modules combined.log error.log && chown -R node /opt/app

USER node

FROM base as release

USER root
RUN npm install --omit=dev && npm install -g typescript && chown -R node /opt/app

USER node
ENV HOME_DIR=/opt/app \
    NODE_ENV=production \
    PORT=5501

ENTRYPOINT npm run build && npm run start

FROM base as build

USER root
RUN npm install -g nodemon ts-node-dev && npm install && chown -R node /opt/app

USER node

ENTRYPOINT npm run dev