import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { AppError } from "../../../../shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
describe("Create car specification", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("Should be able to add a new specification to  a now-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];
    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exist"));
  });

  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      brand: "Brand Car",
      category_id: "category",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "Description",
      name: "name",
    });

    const specifications_id = [specification.id];

    const specificationCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationCar).toHaveProperty("specifications");
    expect(specificationCar.specifications.length).toBe(1);
  });
});
