# Run Tasklist locally

This guide will help you to install Tasklist on your local machine.

The application consists of three services:

- The React fontend
- The Node.js Express web-app
- PostgreSQL database

```plain text
# Structure of the app
┌─────────────┐     ┌─────────────┐     ┌────────────────┐
│  Frontend   ├─────▶   Web app   ├─────▶    Database    │
│  - React -  ◀─────┐ - Express - ◀─────┐ - PostgreSQL - │
└─────────────┘     └─────────────┘     └────────────────┘
```

You need to run all of them in parallel for the application to work.

## Prerequisites

Install globally [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io/installation).

## The React frontend

```bash
# ./frontend

# 1. Install dependencies
pnpm install

# 2. Create a .env with REACT_APP_API_URL variable
echo REACT_APP_API_URL=http://localhost:5000 > .env

# 3. Run the frontend
pnpm run start
```

The frontend should be accessible at http://localhost:3000

## The Node.js Express web-app
```bash
# ./web-app

# 1. Install dependencies
npm install

# 2. Create a .env with evironmental variables
cat <<EOF > .env
PG_USER=postgres
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=tasklist
PG_PASSWORD=postgres-password
SESS_SECRET=your_session_secret
EOF

# 3. Consider replacing SESS_SECRET and PG_PASSWORD with your own (optional)

# 4. Run the web-app in dev mode: nodemon and tsc compiler
#    To have a connection to DB you must set up PostgreSQL first
pnpm run dev

```
`SESS_SECRET` is used to sign the sessionID cookie, which enables a use of user accounts. For more information about sessions refer to [express-session documentation](https://github.com/expressjs/session).

The web-app should be accessible at http://localhost:5000. Concrete endpoint http://localhost:5000/auth/check-auth should repond with `{"isAuthenticated":false}`.

## PostgreSQL database

Before running commands, install PostgreSQL on your local machine. Refer to [PostgreSQL documentation](https://www.postgresql.org/download/).

```bash
# ./

# 1. Create tasklist database and its general tables
psql -a -f ./db/init-scripts/01_tasklist-setup.sql
# or
sudo -u postgres psql -a -f ./db/init-scripts/01_tasklist-setup.sql

# 2. Create session tables
psql tasklist < ./web-app/node_modules/connect-pg-simple/table.sql
# or
sudo -u postgres psql tasklist < ./web-app/node_modules/connect-pg-simple/table.sql

# 3. Set up password for the postgres user
#    Must match the value in ./web-app/.env
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres-password';"

```

For more information about sessions visit  documentation for [express-session](https://github.com/expressjs/session) and [connect-pg-simple](https://github.com/voxpelli/node-connect-pg-simple).
