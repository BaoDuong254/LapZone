import express from "express";
import "dotenv/config";
import webRoutes from "./routes/web";
import getConnection from "./config/database";
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

// connect to database
getConnection()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
