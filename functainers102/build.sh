#! /usr/bin/env bash
. init.sh

docker build . -t ${DOCKER_USER}/${name}:${version}
