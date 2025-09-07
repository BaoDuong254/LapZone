import express from "express";
import "dotenv/config";
import webRoutes from "./routes/web";
const app = express();
const port = process.env.PORT || 3000;

// set view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// load routes
webRoutes(app);

// config static files
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
