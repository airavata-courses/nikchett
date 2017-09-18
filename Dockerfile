FROM node:boron

# Create app directory
WORKDIR /app

COPY package.json .

RUN npm install

# Bundle app source
COPY . /app


CMD node index.js