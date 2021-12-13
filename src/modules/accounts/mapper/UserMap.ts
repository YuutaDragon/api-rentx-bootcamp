import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUserReturn {
  name: string;
  email: string;
  driver_license: string;
  id?: string;
  avatar?: string;
  avatat_url: string;
}

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };
