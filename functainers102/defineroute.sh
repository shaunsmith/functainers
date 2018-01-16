#! /usr/bin/env bash
. init.sh

# Does app ${FN_APP} exist?
# TODO: make sure appname is just ${FN_APP} and not more
app_occurs=`fn apps l ${FN_APP} | grep ${FN_APP} | wc -l`
if [ $app_occurs -lt 1 ] ; then
   fn apps create ${FN_APP}
fi

# Create or update the route
if !(fn routes update ${FN_APP} /${name} --f ${format} --image ${DOCKER_USER}/${name}:${version} 2>/dev/null) ; then
    fn routes create  ${FN_APP} /${name} --f ${format} --image ${DOCKER_USER}/${name}:${version}
fi

# Display all FN_APP routes
fn routes l ${FN_APP}