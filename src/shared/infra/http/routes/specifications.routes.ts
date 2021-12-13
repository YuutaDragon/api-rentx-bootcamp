import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecification = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecification.handle
);

export { specificationsRoutes };
