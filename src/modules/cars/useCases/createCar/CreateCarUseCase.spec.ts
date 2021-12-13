import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      brand: "Brand Car",
      category_id: "category",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });
    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      brand: "Brand Car",
      category_id: "category",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    await expect(
      createCarUseCase.execute({
        name: "Name Car2",
        description: "Description Car",
        daily_rate: 100,
        brand: "Brand Car",
        category_id: "category",
        fine_amount: 60,
        license_plate: "ABC-1234",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("Should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      brand: "Brand Car",
      category_id: "category",
      fine_amount: 60,
      license_plate: "ABCD-1234",
    });

    expect(car.available).toBe(true);
  });
});
