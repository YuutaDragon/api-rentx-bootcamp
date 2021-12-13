interface IUserResponseDTO {
  name: string;
  email: string;
  driver_license: string;
  id?: string;
  avatar?: string;
  avatat_url(): string;
}

export { IUserResponseDTO };
