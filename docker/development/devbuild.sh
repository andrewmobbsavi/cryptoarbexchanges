#!/bin/bash
printf 'Starting first build...\n\n'
docker-compose up --build -d
docker exec cryptoexchangestrapi npm install

sleep 10

docker exec cryptoexchangestrapi npm run develop

