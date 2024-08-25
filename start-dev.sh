#!/usr/bin/env bash

#################################
## Run application in DEV mode ##
#################################

project_name=$(basename "$PWD")
container_name=$(docker compose --file docker-compose-dev.yaml ps --services | grep server)

started_at=$(date +"%s")

echo "-----> Provisioning containers"
docker compose --file docker-compose-dev.yaml up -d
echo ""

# Run Sequelize's migrations.
echo "-----> Running application migrations"
docker exec -it "${container_name}" sequelize db:migrate
echo ""

# Run Sequelize's seeds.
echo "-----> Running application seeds"
docker exec -it "${container_name}" sequelize db:seed:all
echo "<----- Seeds created"

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"