FROM node:boron

# Create app directory
WORKDIR /

COPY package.json .

RUN npm install

# Bundle app source
COPY . /

EXPOSE 2007

CMD node index.js
