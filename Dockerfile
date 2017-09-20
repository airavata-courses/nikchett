FROM node:boron

# Create app directory
WORKDIR /

COPY package.json .

RUN npm install

# Bundle app source
COPY . /

EXPOSE 3007

CMD node index.js
