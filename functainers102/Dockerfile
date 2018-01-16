# When committing changes to this file 
# please update in README.md

FROM node:8-alpine

WORKDIR /function

# cli should forbid this name
ADD func.js /function/func.js
ADD package.json /function/package.json

# install required modules
RUN npm install

# Run the handler, with a payload in the future.
ENTRYPOINT ["node", "./func.js"]