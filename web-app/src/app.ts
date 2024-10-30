// Modules
import express, { Request, Response } from "express";
const app = express();
import path from "path";
import session from "express-session";
import connectPGSimple from "connect-pg-simple";
const pgStorage = connectPGSimple(session);
import pool from "./configs/dbConnection";
import handleErrors from "./middlewares/handleErrors";
import requireAuth from "./middlewares/requireAuth";
import logger from "./utils/logger";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import enforce from "express-sslify";
import morgan from "morgan";
import authAPI from "./components/auth/authAPI";
import tasksAPI from "./components/tasks/tasksAPI";
import foldersAPI from "./components/folders/foldersAPI";
import colorsAPI from "./components/colors/colorsAPI";
import usersAPI from "./components/users/usersAPI";

const {
  PORT = 5000,
  NODE_ENV = "development",
  SESS_SECRET = "session secret",
  CLIENT_ORIGIN = "http://localhost:3000",
} = process.env;


if (NODE_ENV === "production") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));

app.use(morgan("tiny"));

app.use(
  session({
    store: new pgStorage({
      pool: pool,
    }),
    proxy: true,
    resave: false,
    saveUninitialized: true,
    secret: SESS_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
      secure: NODE_ENV !== "development",
      // sameSite: "none",
    },
  })
);

app.use(express.json()); // parse req.body as json

// Static content when production
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// ROUTES //

app.get("/session", (req: Request, res: Response) => {
  res.json(req.session);
});

app.use("/auth", authAPI);
app.use("/tasks", requireAuth, tasksAPI);
app.use("/folders", requireAuth, foldersAPI);
app.use("/colors", colorsAPI);
app.use("/users", usersAPI);

app.get("/*", (req: Request, res: Response) => {
  logger.info(path.join(__dirname, "../client/build/index.html"));
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) res.status(500).send(err);
    }
  );
});

app.use(handleErrors);

app.listen(PORT, () => {
  logger.info(`server started on port ${PORT}`);
});
