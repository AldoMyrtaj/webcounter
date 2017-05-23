# Project Title

This is a simple hit-counter developed as part of the Advance Web Tech Class Assignment. 

## Getting Started

These instructions will get you a copy of the project up and running on your Digital Ocean Droplets for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Docker

Digital Ocean Droplet x 2 (One hosting the Docker and the other a Redis Database Droplet)
### Installing

This section will teach you how to install Docker on your Digital Ocean droplet(server) 
This applies also for installing Docker on your machine(if you are using linux ubuntu 16.04)

For windows instalation on local machine please refer [here](https://docs.docker.com/toolbox/toolbox_install_windows/).

Install packages to allow apt to use a repository over HTTPS:

```
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
```

Add Docker’s official GPG key:

```
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Use the following command to set up the stable repository. You always need the stable repository, even if you want to install edge builds as well. (amd64)

```
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

Update the apt package index.

```
$ sudo apt-get update
```

Install the latest version of Docker, or go to the next step to install a specific version. Any existing installation of Docker is replaced.

```
$ sudo apt-get install docker-ce
```

After installing docker on your local machine and in your Digital Ocean Droplet you are ready to make a node image of the app and then push and pull from the repository


## Deployment

After cloning the repository and asuming that you ran the app localy with nodejs you can start with deployment of the app. 
First, create a new directory where all the files would live. In the downloaded project directory take a look at  package.json file that describes the app and its dependencies: 

```
{
  "name": "webcounter",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.15.2",
       "redis": "^2.7.1"
  }
}
```

We use express for handling the requests and redis database instance to connect with the redis server. Also check the .Docker file in the downloaded project directory.

```
FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]
```
What we do here is first we tell docker that we want to use a NodeJs Docker and then where to create the app directory and where to install the dependencies stated before in the package.json file. We then expose the port that we set the app to work on and start the service by calling npm start.

After these two files we set the last file .dockerignore that has content:

```
node_modules
npm-debug.log
```

This tells docker to ignore some dode modules not needed and the debuging log of npm tool.After this it is time to build the image:

```
$ docker build -t aldomyrtaj/webcounter .
```

Then we push this image to the Docker hub:

```
$ docker login
$ docker push aldomyrtaj/webcounter
```

After that we login via SSH to the server and then we do the following: 


We login to Docker hub and pull the image from their repository

```
$ docker login
$ docker pull aldomyrtaj/webcounter

```

We run the image in our server and assign port 80 of the server to respond to the virtual port of the image that is 8080(set in the app and in the .docker file.

```
$ docker run -p 80:8080 -d aldomyrtaj/webcounter
```


## Authors

* **Aldo Myrtaj** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* AWT Group Natural Language Processing