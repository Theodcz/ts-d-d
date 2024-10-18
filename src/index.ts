import express from "express";
import { characterRouter } from "./character-router";
import morgan from "morgan";

const app = express();

app.use(morgan("combined"));

app.use(characterRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
