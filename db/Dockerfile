FROM postgres:17.0-alpine3.20

# Initial scripts that build tables
COPY init-scripts/ /docker-entrypoint-initdb.d/

EXPOSE 5432