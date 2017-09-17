FROM node:boron

# Create app directory
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3002
CMD node index.js