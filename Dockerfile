FROM node:boron

# Create app directory
WORKDIR /

COPY package.json .

RUN npm install

# Bundle app source
COPY . /


CMD node index.js