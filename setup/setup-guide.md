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
## Setup mongoDB
To store user sessions you will require [MongoDB](https://www.mongodb.com/).

Use [this guide by freecodecamp](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/) to create an account and set up mongoDB.

While you doing that, grab `<username>`, `<password>`, `<cluster-name>` and `<db-name>`. You will need them to configure `.env` at the next step.


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

### MongoDB 
These variables allow server to connect to mongoDB. You should find them in your mongoDB account.

Below is an example. Your values going to be different.
```
MONGODB_USER_PASSWORD=u17FC7tjhKjtpM96
MONGODB_USER_NAME=worm
MONGODB_CLUSTER_NAME=cluster0.s0yec
MONGODB_DATABASE_NAME=tasklist
```
## Run the app
### Run server
Run from root directory:
```bash
# For development
npm run dev

# For production
npm start
```
You should see message in terminal "server started on port 5000".
### Run client
Open another terminal and run from root directory:
```
npm start --prefix client
```
Then open browser, hit http://localhost:3000 and enjoy!
