// Modules
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const MongoDBStorage = require("connect-mongodb-session")(session);
const handleErrors = require("./middlewares/handleErrors");
const requireAuth = require("./middlewares/requireAuth");
const logger = require("./utils/logger");
require("dotenv").config();
const enforce = require('express-sslify');

const {
    PORT = 5000,
    NODE_ENV = "development",
    SESS_SECRET = "session secret",
    MONGODB_USER_PASSWORD,
    MONGODB_USER_NAME,
    MONGODB_CLUSTER_NAME
} = process.env;

// Redirect to https on heroku
if (NODE_ENV === "production") {
    app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESS_SECRET,
    secure: NODE_ENV === "production",
    store: new MongoDBStorage({
        uri: `mongodb+srv://${MONGODB_USER_NAME}:${MONGODB_USER_PASSWORD}@${MONGODB_CLUSTER_NAME}.mongodb.net/tasklist?retryWrites=true&w=majority`,
        databaseName: "tasklist",
        collection: "session"
    }, (error) => { if (error) { console.log(error) } }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
    }
}));

app.use(express.json()); // parse req.body as json

// Static content when production
if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

// ROUTES //

app.get("/session", (req, res) => {
    res.json(req.session);
})

app.use("/auth", require("./routes/auth"));
app.use("/tasks", requireAuth, require("./routes/tasks"));
app.use("/folders", requireAuth, require("./routes/folders"));
app.use("/colors", require("./routes/colors"));
app.use("/users", require("./routes/users"));

app.get('/*', (req, res) => {
    logger.info(path.join(__dirname, '/client/build/index.html'));
    res.sendFile(path.join(__dirname, '/client/build/index.html'), function (err) {
        if (err) res.status(500).send(err);
    })
})

app.use(handleErrors);

app.listen(PORT, () => {
    logger.info(`server started on port ${PORT}`)
});