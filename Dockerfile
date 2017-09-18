FROM node:boron

# Create app directory
WORKDIR /usr/src/app/NodeAPI

COPY package.json .

RUN npm install

# Bundle app source
COPY . /usr/src/app/NodeAPI

EXPOSE 3001
CMD node index.js