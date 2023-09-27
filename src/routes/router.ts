import express, { ErrorRequestHandler, RequestHandler } from "express";
import sampleSpaceRouter from "./api/sample-space.routes";
import outcomeRouter from "./api/outcome.routes";

const mainRouter = express.Router();

mainRouter.use("/", (req, res, next) => {
  console.log("Request at: " + req.url);
  next();
});
mainRouter.use("/api/sample-space", sampleSpaceRouter);
mainRouter.use("/api/outcome", outcomeRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.send(err);
};
mainRouter.use(errorHandler);

export { mainRouter };
