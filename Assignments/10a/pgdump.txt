docker-compose up -d
docker-compose dopwn -v

docker exec -it <ID> psql -U myuser -d mydatabase 

docker compose exec -T db pg_dump -U myuser mydatabase > pgdump.sql