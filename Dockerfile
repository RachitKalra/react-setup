FROM node:12.16.1

# please make sure you have already build the node app for production
# this docker image will not build the node js project for you please treat as a prerequisite

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# copying files
COPY www-start ./
COPY public ./public
COPY views ./views

# todo install only dependencies
RUN npm install

# exposing the app port to the world
EXPOSE 3497

CMD npm start