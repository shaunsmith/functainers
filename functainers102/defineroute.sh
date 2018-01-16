#! /usr/bin/env bash
export DOCKER_USER=${1}

. config.properties

if [ -z "$DOCKER_USER" ]; then
  echo "usage: ${0} <docker userid> (or define user in config.properties)"
  exit -1
fi

# Does app ${FN_APP} exist?
# TODO: make sure app name is just ${FN_APP} and not more
app_occurs=`fn apps l ${FN_APP} | grep ${FN_APP} | wc -l`
if [ $app_occurs -lt 1 ] ; then
   fn apps create ${FN_APP}
fi

# Create or update the route
if !(fn routes update ${FN_APP} /${FUNC_NAME} --f json --image ${DOCKER_USER}/${FUNC_NAME}:${FUNC_VERSION} 2>/dev/null) ; then
    fn routes create  ${FN_APP} /${FUNC_NAME} --f json --image ${DOCKER_USER}/${FUNC_NAME}:${FUNC_VERSION}
fi

fn routes l ${FN_APP}