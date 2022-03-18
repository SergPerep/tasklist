# Setup guide
A guide to help you to install project on your local machine

## Install dependencies
After your have cloned repository to your local machine, open terminal and run the following commands:
```bash
# For server
npm install

# For client
npm install --prefix client
```
## Set up postgres database
First, install postgreSQL on your local machine. [PostgreSQL documentation](https://www.postgresql.org/download/) should help you with that.

After that run code of [postgres-db-setup.sql](./postgres-db-setup.sql) file. 

Use this command:
```bash
psql -a -f setup/postgres-db-setup.sql
```
It creates database and relevant tables inside it.
## Setup sessions

To create tables for sessions run this command:
```bash
psql tasklist < node_modules/connect-pg-simple/table.sql
```
For more information about sessions visit  documentation for [express-session](https://github.com/expressjs/session) and [connect-pg-simple](https://github.com/voxpelli/node-connect-pg-simple).


## Setup environmental variables
In a root directory create a file `.env`. It would hold secret information that you do not want to share.

For more information about `.env` read [dotenv documentation](https://github.com/motdotla/dotenv).

### Postgres variables
These variables allow server to connect to postgres database. Below are standard values. You can probably copy-paste them and it would work fine.
```
PG_USER=postgres
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=tasklist
```

### Sessions variable
This is a secret that used to sign the sessionID cookie. Which enables a use of user accounts.

Below is an example. Don't just copy-paste it. You should come up with your own value.
```
SESS_SECRET=your#session#secret
```
For more information about sessions read [express-session documentation](https://github.com/expressjs/session).

## Run the app
### Run server
Run from root directory:
```bash
npm run server
```
You should see message in terminal "server started on port 5000".
### Run client
Open another terminal and run from root directory:
```
npm run client
```
Then open browser, hit http://localhost:3000 and enjoy!
