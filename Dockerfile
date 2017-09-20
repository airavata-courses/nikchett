FROM node:boron

# Create app directory
WORKDIR /

COPY package.json .

RUN npm install

# Bundle app source
COPY . /

EXPOSE 3017

CMD node index.js
