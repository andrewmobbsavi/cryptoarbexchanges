# Development Setup

* Docker and Docker Compose are required for this project. Please [visit here](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/How-to-install-Docker-and-docker-compose-on-Ubuntu) to learn how to install and set Docker up. 

This project makes use of Strapi 4 as a CMS, and React for the frontend. MySQL 8 is used as a database.

Development setup instructions:

- cd docker/development
- ./devbuild.sh

This will build the development environment in docker, and will run npm install for you. After the build has been completed, please visit:

[The Strapi Admin Area](http://localhost:1337/admin) 