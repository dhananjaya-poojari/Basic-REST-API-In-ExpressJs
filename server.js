import express, { json } from "express";
const app = express();
import { connect } from "mongoose";
const Port = 3000;

app.use(json());

import router from "./routers/router.js";
app.use("/subscribers", router);

connect("Paste Connection String", {
  user: "username",
  pass: "Password",
})
  .then(() => {
    console.log("Database Connected!");
    app.listen(Port, () => console.log("Server started at " + Port));
  })
  .catch((e) => console.log("Error connecting Database" + e));
