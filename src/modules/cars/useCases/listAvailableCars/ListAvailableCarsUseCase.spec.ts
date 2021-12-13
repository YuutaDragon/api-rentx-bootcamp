import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });
  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 140.0,
      brand: "Car brand",
      category_id: "category id",
      fine_amount: 100,
      license_plate: "DEF-1212",
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2 name",
      description: "Car description",
      daily_rate: 140.0,
      brand: "Car2 brand",
      category_id: "category id",
      fine_amount: 100,
      license_plate: "DEF-1212",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car2 Brand",
    });
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3 name",
      description: "Car description",
      daily_rate: 140.0,
      brand: "Car3 brand",
      category_id: "category id",
      fine_amount: 100,
      license_plate: "DEF-1212",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3 name",
    });
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3 name",
      description: "Car description",
      daily_rate: 140.0,
      brand: "Car3 brand",
      category_id: "12345",
      fine_amount: 100,
      license_plate: "DEF-1212",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });
    expect(cars).toEqual([car]);
  });
});
