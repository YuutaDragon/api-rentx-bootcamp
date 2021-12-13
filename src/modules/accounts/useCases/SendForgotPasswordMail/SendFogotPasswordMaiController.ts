import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendFogotPasswordMailUseCase } from "./SendFogotPasswordMailUseCase";

class SendFogotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendFogotPasswordMailUseCase = container.resolve(
      SendFogotPasswordMailUseCase
    );

    await sendFogotPasswordMailUseCase.execute(email);

    return response.send();
  }
}

export { SendFogotPasswordMailController };
