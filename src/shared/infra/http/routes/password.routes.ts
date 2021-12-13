import { Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendFogotPasswordMailController } from "@modules/accounts/useCases/SendForgotPasswordMail/SendFogotPasswordMaiController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendFogotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
