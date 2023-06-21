#!/bin/bash
printf 'Starting the application...\n\n'
docker-compose up -d
sleep 10
docker exec cryptoexchangestrapi npm run develop
