#!/bin/sh
export NODE_ENV=dev
export PORT=5501
ts-node-dev -r tsconfig-paths/register --respawn --transpile-only ./src/server.ts