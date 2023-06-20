#!/bin/bash
printf 'Starting first build...\n\n'
docker-compose up --build -d

printf 'Installing Strapi...\n\n'