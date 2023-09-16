import { ApiError, getErrorMessage } from "@app/infrastructure/utility/api-error";
import { SampleSpace } from "@app/models/sample-space";
import { create, getById, update } from "@app/repositories/sample-space.repo";
import { Router } from "express";

const sampleSpaceRouter = Router();

sampleSpaceRouter.get<{ id: string }, SampleSpace, {}>(
  "/:id",
  async (req, res, next) => {
    let sampleSpace = await getById(Number(req.params.id));
    if (!sampleSpace) {
      res.status(404);
      return next(new ApiError(`Sample Space Id: ${req.params.id} not found`));
    }
    res.status(200).send(sampleSpace);
  }
)

sampleSpaceRouter.post<{  }, number, SampleSpace>(
  "/",
  async (req, res, next) => {
    try {
      let sampleSpace = await create(req.body);
      res.status(201).send(sampleSpace.insertedId);
    }
    catch (err) {
      res.status(400);
      return next(new ApiError(`Cannot create Sample Space`, getErrorMessage(err)));
    }    
  }
)

sampleSpaceRouter.put<{  }, number, SampleSpace>(
  "/",
  async (req, res, next) => {
    try {
      let sampleSpace = await update(req.body);
      res.status(201).send(sampleSpace.upsertedId);
    }
    catch (err) {
      res.status(400);
      return next(new ApiError(`Cannot update Sample Space`, getErrorMessage(err)));
    }    
  }
)

