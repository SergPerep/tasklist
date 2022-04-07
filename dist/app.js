"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const pgStorage = (0, connect_pg_simple_1.default)(express_session_1.default);
const dbConnection_1 = __importDefault(require("./configs/dbConnection"));
const handleErrors_1 = __importDefault(require("./middlewares/handleErrors"));
const requireAuth_1 = __importDefault(require("./middlewares/requireAuth"));
const logger_1 = __importDefault(require("./utils/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_sslify_1 = __importDefault(require("express-sslify"));
const morgan_1 = __importDefault(require("morgan"));
const authAPI_1 = __importDefault(require("./components/auth/authAPI"));
const tasksAPI_1 = __importDefault(require("./components/tasks/tasksAPI"));
const foldersAPI_1 = __importDefault(require("./components/folders/foldersAPI"));
const colorsAPI_1 = __importDefault(require("./components/colors/colorsAPI"));
const usersAPI_1 = __importDefault(require("./components/users/usersAPI"));
const { PORT = 5000, NODE_ENV = "development", SESS_SECRET = "session secret" } = process.env;
// Redirect to https on heroku
if (NODE_ENV === "production") {
    app.use(express_sslify_1.default.HTTPS({ trustProtoHeader: true }));
}
app.use((0, morgan_1.default)("tiny"));
app.use((0, express_session_1.default)({
    store: new pgStorage({
        pool: dbConnection_1.default
    }),
    resave: false,
    saveUninitialized: true,
    secret: SESS_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        secure: NODE_ENV === "production"
    }
}));
app.use(express_1.default.json()); // parse req.body as json
// Static content when production
if (NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "client/build")));
}
// ROUTES //
app.get("/session", (req, res) => {
    res.json(req.session);
});
app.use("/auth", authAPI_1.default);
app.use("/tasks", requireAuth_1.default, tasksAPI_1.default);
app.use("/folders", requireAuth_1.default, foldersAPI_1.default);
app.use("/colors", colorsAPI_1.default);
app.use("/users", usersAPI_1.default);
app.get('/*', (req, res) => {
    logger_1.default.info(path_1.default.join(__dirname, '/client/build/index.html'));
    res.sendFile(path_1.default.join(__dirname, '/client/build/index.html'), function (err) {
        if (err)
            res.status(500).send(err);
    });
});
app.use(handleErrors_1.default);
app.listen(PORT, () => {
    logger_1.default.info(`server started on port ${PORT}`);
});
