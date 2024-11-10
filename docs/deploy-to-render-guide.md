# Deploy Tasklist to Render.com

[Render.com](https://render.com/) offers a free "Hobby" tier (as of November 2024). To deploy the full Tasklist, you'll need to create three services in the following order::

1. [PostgreSQL](#postgresql)
1. [Frontend - Static Site](#frontend---static-site)
1. [Web-app - Web Service](#web-app---web-service)

## PostgreSQL

First create a Render PostgreSQL service.

### Run initial scripts

Find the PSQL command, which allows you to connect to the remote database via your local terminal. It should follow this format:

```bash
PGPASSWORD=<password> psql -h <hostname> -U <user> <database-name>
```

While connected to the remote database, copy and paste the contents of the [01_tasklist-setup.sql](../db/init-scripts/01_tasklist-setup.sql) and [02_sessions-setup.sql](../db/init-scripts/02_sessions-setup.sql) to create tables for tasklist data and user sessions.

> Note that Render might generate a different database name for you. Make sure to use the correct name when executing the `CREATE DATABASE` and `\c` commands.

## Frontend - Static Site

Create Render Static Site service,

Choose `frontend` as root directory. Set `frontend/build` as publish directory.

### Commands

```bash
# Build command
pnpm run build
```

### Environmental variables

```bash
# Node version should match verion in package.json
NODE_VERSION=20.18.0

# Should be the base URL to your web-app (the next step)
REACT_APP_API_URL=https://...onrender.com 
```

## Web-app - Web Service

Choose `web-app` as root directory.

### Commands

```bash
# Build command
pnpm install && pnpm run build

# Run command
pnpm run start
```

### Environmental variables

```bash
# Should be the URL to your static sites service that you've set up previously
CLIENT_ORIGIN=https://...onrender.com 

# Should be the version that mentioned in package.json
NODE_VERSION=20.18.0 

# Get Database URL from PostgreSQL service that you've set up previously
PG_DATABASE_URL=postgresql://...

# Generate your own session secret
SESS_SECRET=I69xczXBd9...
```