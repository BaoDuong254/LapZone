import express from "express";
import "dotenv/config";
import webRoutes from "routes/web";
import initDatabase from "config/seed";
const app = express();
const port = process.env.PORT || 3000;

// parse request to body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

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
