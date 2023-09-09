import express from "express";
import { config } from "dotenv";

console.log(process.env.NODE_ENV);
config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
