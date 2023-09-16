import { ApiError, getErrorMessage } from "@app/infrastructure/utility/api-error";
import { SampleSpace } from "@app/models/sample-space";
import { create, deleteById, getById, update } from "@app/repositories/sample-space.repo";
import express from "express";
import { InsertOneResult, UpdateResult } from "mongodb";

const sampleSpaceRouter = express.Router();

sampleSpaceRouter.get<{ id: string }, SampleSpace, {}>(
  "/:id",
  async (req, res, next) => {
    try {
      let sampleSpace = await getById(req.params.id);
      if (!sampleSpace) {
        res.status(404);
        return next(new ApiError(`Sample Space Id: ${req.params.id} not found`));
      }
      res.status(200).send(sampleSpace);
    }
    catch (err) {
      res.status(400);
      return next(new ApiError(`Cannot get Sample Space`, getErrorMessage(err)));
    } 
  }
)

sampleSpaceRouter.post<{  }, InsertOneResult, SampleSpace>(
  "/",
  async (req, res, next) => {
    try {
      let result = await create(req.body);
      res.status(201).send(result);
    }
    catch (err) {
      res.status(400);
      return next(new ApiError(`Cannot create Sample Space`, getErrorMessage(err)));
    }    
  }
)

sampleSpaceRouter.put<{  }, UpdateResult, SampleSpace>(
  "/",
  async (req, res, next) => {
    try {
      let result = await update(req.body);
      res.status(201).send(result);
    }
    catch (err) {
      res.status(400);
      return next(new ApiError(`Cannot update Sample Space`, getErrorMessage(err)));
    }    
  }
)

sampleSpaceRouter.delete<{ id: string }, { deleted: number }, {}>(
  "/:id",
  async (req, res, next) => {
    try {
      let result = await deleteById(req.params.id);
      if (!result) {
        res.status(404);
        return next(new ApiError(`Sample Space Id: ${req.params.id} not found`));
      }
      res.status(200).send({ deleted: result.deletedCount });
    }
    catch (err) {
      res.status(400);
      return next(new ApiError(`Cannot delete Sample Space`, getErrorMessage(err)));
    }  
  }
)

export default sampleSpaceRouter;
