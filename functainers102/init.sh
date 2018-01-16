# Common init for all utility scripts

# Define explicity to avoid having to provide on command line
DOCKER_USER=${1}

# Application Name
FN_APP=functainer

. parse_yaml.sh

if [ -e "func.yaml" ]; then
  # parse func.yaml to define function $name, $version, etc.
  eval $(parse_yaml func.yaml)
else
  echo "Error: func.yaml not found."
  exit -1
fi

if [ -z "$DOCKER_USER" ]; then
  echo "usage: ${0} <docker userid> (or define user in init.sh)"
  exit -1
fi