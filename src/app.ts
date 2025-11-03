import express from "express";
import "dotenv/config";
import webRoutes from "routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "middlewares/passport.local";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "generated/prisma";
import apiRoutes from "routes/api";
import path from "path";
const app = express();
const port = process.env.PORT || 3000;

// parse request to body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// config session for passport
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 1 * 24 * 60 * 60 * 1000, // 1 day
      dbRecordIdIsSessionId: true,
    }),
  })
);

// config passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));
configPassportLocal();

// config static files (phải được đặt trước routes)
app.use(express.static("public"));

// Make user object available in all views
app.use((req, res, next) => {
  res.locals.user = req.user || null; // Pass user object to all views
  next();
});

// load routes
webRoutes(app);
apiRoutes(app);

// seeding database
initDatabase();

app.use((req, res) => {
  res.status(404).render("status/404");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
