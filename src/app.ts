import express from "express";
import "dotenv/config";
import webRoutes from "routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "src/middlewares/passport.local";
import session from "express-session";
const app = express();
const port = process.env.PORT || 3000;

// parse request to body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// config session for passport
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));
configPassportLocal();

// load routes
webRoutes(app);

// config static files
app.use(express.static("public"));

// seeding database
initDatabase();

app.use((req, res) => {
  res.status(404).render("client/404");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
