#! /usr/bin/env bash
. init

docker build . -t ${DOCKER_USER}/${name}:${version}
