FROM node:16 as base

ADD ./ /opt/app
WORKDIR /opt/app

USER root
RUN rm -rf node_modules combined.log error.log \
    && npm install -g ts-node-dev typescript \
    && npm install \
    && npm run build \
    && chown -R node /opt/app

USER node

FROM base as release

ADD ./ /opt/app
WORKDIR /opt/app

USER root
RUN rm -rf node_modules \
    && npm install --omit=dev \
    && chown -R node /opt/app

USER node
ENV HOME_DIR=/opt/app \
    NODE_ENV=production \
    PORT=5501

ENTRYPOINT npm run start

FROM base as build

# USER root
# RUN rm -rf node_modules \
#     && npm install -g ts-node-dev \
#     && npm install \
#     && chown -R node /opt/app

USER node
ENV HOME_DIR=/opt/app \
    NODE_ENV=dev \
    PORT=5501

ENTRYPOINT npm run dev