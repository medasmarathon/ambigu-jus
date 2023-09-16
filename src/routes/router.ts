import express, { ErrorRequestHandler, RequestHandler } from "express";

const mainRouter = express.Router();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.send(err);
};
mainRouter.use(errorHandler);

export default mainRouter;
