import { AppContext } from "@app/app-context";
import { ApiError, getErrorMessage } from "@app/infrastructure/utility/api-error";
import { Outcome } from "@app/entities/outcome";
import { create, deleteById, getById, update } from "@app/repositories/outcome.repo";
import express from "express";
import { InsertOneResult, UpdateResult } from "mongodb";

const outcomeRouter = express.Router();

outcomeRouter.get<{ id: string }, Outcome, {}>(
  "/:id",
  async (req, res, next) => {
    try {
      let outcome = await getById(AppContext.Db, req.params.id);
      if (!outcome) {
        res.status(404);
        return next(new ApiError(`Outcome Id: ${req.params.id} not found`));
      }
      res.status(200).send(outcome);
    }
    catch (err) {
      res.status(400);
      return next(new ApiError(`Cannot get Outcome`, getErrorMessage(err)));
    } 
  }
)

outcomeRouter.post<{  }, InsertOneResult, Outcome>(
  "/",
  async (req, res, next) => {
    try {
      let result = await create(AppContext.Db, req.body);
      res.status(201).send(result);
    }
    catch (err) {
      res.status(400);
      return next(new ApiError(`Cannot create Outcome`, getErrorMessage(err)));
    }    
  }
)

outcomeRouter.put<{  }, UpdateResult, Outcome>(
  "/",
  async (req, res, next) => {
    try {
      let result = await update(AppContext.Db, req.body);
      res.status(201).send(result);
    }
    catch (err) {
      res.status(400);
      return next(new ApiError(`Cannot update Outcome`, getErrorMessage(err)));
    }    
  }
)

outcomeRouter.delete<{ id: string }, { deleted: number }, {}>(
  "/:id",
  async (req, res, next) => {
    try {
      let result = await deleteById(AppContext.Db, req.params.id);
      if (!result) {
        res.status(404);
        return next(new ApiError(`Outcome Id: ${req.params.id} not found`));
      }
      res.status(200).send({ deleted: result.deletedCount });
    }
    catch (err) {
      res.status(400);
      return next(new ApiError(`Cannot delete Outcome`, getErrorMessage(err)));
    }  
  }
)

export default outcomeRouter;
