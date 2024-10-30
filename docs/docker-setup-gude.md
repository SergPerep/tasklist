# Docker guide

This is a guide and a brief explanation of how to run Tasklist locally using Docker. Needless to say, Docker should already be installed on your machine.

## Run containers

To run containers use `docker-compose.yaml`:

```bash
docker compose -f docker-compose.yaml up -d
```
This command builds three images and runs three containers within the same network. The application should be accessible at http://localhost:3000.

For production and deployment, consider creating your own `SESS_SECRET` and `POSTGRES_PASSWORD` variables.

## How containers are built

1. `docker-compose.yaml` points to three Docker files: in the `./frontend`, `./web-app/` and `./db` folders
1. Each dockerfile is used to build an image
1. Each image is used to run a container
1. Running containers share the same Docker network

```plain text
                                                 ╭ ─ ─ ─ ─Network─ ─ ─ ─ ─            ┌────────┐
┌────────────────┐       ╔════════════════╗          ┌────────────────┐   │           │        │
│    Frontend    ├───────▶    Frontend    ╟────┐ │   │░░░░Frontend░░░░│      80:3000  │        │
│   Dockerfile   │       ║     Image      ║    └─────▶░░░Container░░░░○───┼───────────○        │
└────────────────┘       ╚════════════════╝      │   └────────────────┘               │        │
                                                                          │           │        │
┌────────────────┐       ╔════════════════╗      │   ┌────────────────┐               │        │
│    Web app     ├───────▶    Web app     ╟──────────▶░░░░Web░app░░░░░│   │ 5000:5000 │  Host  │
│   Dockerfile   │       ║     Image      ║      │   │░░░Container░░░░○───────────────○        │
└────────────────┘       ╚════════════════╝          └───────────○────┘   │           │        │
                                                 │               │                    │        │
┌────────────────┐       ╔════════════════╗          ┌───────────○────┐   │           │        │
│   PostgreSQL   ├───────▶   PostgreSQL   ╟──────┼───▶░░░PostgreSQL░░░│               │        │
│   Dockerfile   │       ║     Image      ║          │░░░Container░░░░│   │           │        │
└────────────────┘       ╚════════════════╝      │   └────────────────┘               │        │
                                                  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ╯           └────────┘     
```

### Frontend image/container

```yaml
# docker-compose.yaml
# ...
frontend:
    build: ./frontend # Points to a Dockerfile
    # environmental variables are set up in the Dockerfile
    ports:
        - 3000:80 # Maps a host port to a container port
    networks:
        - tasklist-net
# ...
```
- **Building the frontend image** occurs in two stages (check [the fronted Dockerfile](../frontend/Dockerfile)). First, the React build is generated, and then the Nginx server is set up to serve the content of the generated build.

- **ENV variables in Dockerfile**. Note that the ENV variable (base URL) for the client is set up in [the frontend Dockerfile](../frontend/Dockerfile) instead of in `docker-compose.yaml`. This is because environment variables become embedded as constants during the React build process, making it troublesome to change them later.

- **Port mappings**. The frontend is the main point of interaction with the user/host. Therefore, the post is exposed to the host. 

### Web-app image/container

```yaml
# docker-compose.yaml
# ...
web-app:
    build: ./web-app # Points to a Dockerfile
    environment:
        - PG_USER=postgres
        - PG_HOST=postgres # Name of the DB container
        - PG_PORT=5432
        - PG_DATABASE=tasklist
        - SESS_SECRET=your_session_secret
    ports:
        - 5000:5000 # Maps a host port to a container port
    networks:
        - tasklist-net
# ...
```

- **Port mappings**. Initially, I thought that port mapping for the web app was unnecessary, since the frontend appeared to be the primary point of interaction with the user. However, the frontend is served to the browser on the host, and then the browser (the host) sends requests to the web app (a container) through the frontend. This means the web app needs to expose its port to the host, making port mapping necessary.

### Database image/container

```yaml
# docker-compose.yaml
# ...
postgres:
    build: ./db # Points to a Dockerfile
    environment:
        - POSTGRES_PASSWORD=mysecretpassword
    networks:
        - tasklist-net
    volumes:
        - postgres-data:/var/lib/postgresql/data # Maps a host directory to a container directory and allows file sharing between them
# ...
```

- **Initial SQL scripts**. During the image building process [01_tasklist-setup.sql](../db/init-scripts/01_tasklist-setup.sql) and [02_sessions-setup.sql](../db/init-scripts/02_sessions-setup.sql) are moved to a specific location within the image (as specified in the PostgreSQL image documentation). When the container is run, it executes the scripts in this location, which is how the tasklist and session tables are created.

- **No port mappings**. The database does not interact with the host; it only interacts with the web app. Therefore, its port is not exposed to the host, and communication with the web app occurs through a Docker network.

- **Volume**. In contrast to the frontend and web app containers, the database must have a persistent state. By default, when a container is stopped (e.g., for redeployment), its data is lost. Therefore, to persist the state of the database, a Docker volume is used. This allows the use of a host directory where the database files can be saved. Since the volume is named (postgres-data), Docker determines which host directory is used.