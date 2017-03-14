FROM node:7.7.2
LABEL maintainer Idan A. <idan5x@live.com>
LABEL version 0.1.0

# Create app directory.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source.
COPY . /usr/src/app/

# Install app dependencies.
RUN npm install

# Expose port 8080.
EXPOSE 8080

# Run app.
CMD [ "npm", "start" ]
