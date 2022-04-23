import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
dotenv.config();

import authRoutes from "./routes/auth.js";

const app = express();

const url = process.env.DATABASE_URL;
const secret = process.env.SECRET;

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("database connected");
  }
);

const mstore = MongoStore.create({
  mongoUrl: url,
  dbName: "session",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5000", //for front end like react
    credentials: true,
    saveUninitialized: true,
  })
);
app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    store: mstore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 5,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

import passportConfig from "./config/passportConfig.js";
passportConfig(passport);

app.use("/auth", authRoutes);

app.listen("3000", () => {
  console.log("connect on port 3000");
});
