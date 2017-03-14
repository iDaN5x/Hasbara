# Hasbara
[![HubBoard board](https://img.shields.io/badge/HuBoard-Board-9058c9.svg)](https://huboard.com/iDaN5x/Hasbara)
[![bitHound Code](https://www.bithound.io/github/iDaN5x/Hasbara/badges/code.svg)](https://www.bithound.io/github/iDaN5x/Hasbara)

Visual representation of Israel's image around the world.

## Running Locally
1.  Clone this repository.
2.  Add a `config.json` file, according to the `config.template.json` file.
3.  Run `yarn install` to install dependencies.  
4.  Run `yarn start` to start the application server.

## Running on Docker
1.  Clone this repository.
2.  Add a `config.json` file, according to the `config.template.json` file.
3.  Generate an image using `docker build -t docker-hasbara` .
4.  Run the image on a container using `docker run docker-hasbara` .
