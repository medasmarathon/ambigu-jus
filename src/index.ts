import "module-alias/register";
import express from "express";
import { config } from "dotenv";
import { mainRouter } from "@app/routes/router";

console.log(process.env.NODE_ENV);
config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const port = process.env.PORT || 80;

app.use(express.urlencoded({ extended: true }));

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
