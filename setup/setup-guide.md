# Setup guide
Guide to help you to install project on your local machine.

## Install dependencies
```bash
# For server
npm install

# For client
cd client && npm install && cd ..
```
## Set up postgres database
You have to install postgress on your local machine.
After that you can continue setting up database and tables.
```bash
psql -a -f setup/postgres-db-setup.sql
```

## Set up mongoDB
To start I recommend [MongoDB Atlas Tutorial – How to Get Started](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/).

While you are setting up your mongoDB, grab `<username>`, `<password>`, `<cluster-name>` and `<db-name>`. You would have to put them in `.env` at the next step.


## Set up environmental variables
In a root directory create a file `.env`. It would hold sensitive information that you do not want to share.

For more information about `.env` read [dotenv documentation](https://github.com/motdotla/dotenv).

### Postrgres variables
These are variables that allow server to connect to postgres database. Below are standard values. You can probably copy-paste them and it should work fine.
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
These are variables that allow server to connect to mongoDB. You should find them in your mongoDB account.

Below is an example. Your values going to be different.
```
MONGODB_USER_PASSWORD=u17FC7tjhKjtpM96
MONGODB_USER_NAME=worm
MONGODB_CLUSTER_NAME=cluster0.s0yec
MONGODB_DATABASE_NAME=tasklist
```
## Run the app
### Run server
From root directory
```bash
# For development
npm run dev

# For production
npm start
```
You should see message in terminal "server started on port 5000".
### Run client
Open new terminal and run from root directory
```
npm start --prefix client
```
Then open browser and hit http://localhost:3000.