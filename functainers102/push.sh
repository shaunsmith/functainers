#! /usr/bin/env bash
export DOCKER_USER=${1}

. config.properties

if [ -z "$DOCKER_USER" ]; then
  echo "usage: ${0} <docker userid> (or define user in config.properties)"
  exit -1
fi

docker push ${DOCKER_USER}/${FUNC_NAME}:${FUNC_VERSION}