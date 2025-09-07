import express from "express";
import "dotenv/config";
import webRoutes from "./routes/web";
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
webRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
