FROM node:boron

# Create app directory
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3007

CMD node index.js
