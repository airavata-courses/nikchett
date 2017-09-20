FROM node:boron

# Create app directory
WORKDIR /usr/src/app/ui

COPY package.json .

RUN npm install

# Bundle app source
COPY . /usr/src/app/ui

EXPOSE 3015
CMD node index.js