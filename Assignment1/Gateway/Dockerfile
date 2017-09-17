FROM node:boron

# Create app directory
WORKDIR /usr/src/app/Gateway

COPY package.json .

RUN npm install

# Bundle app source
COPY . /usr/src/app/Gateway

EXPOSE 3000
CMD node index.js