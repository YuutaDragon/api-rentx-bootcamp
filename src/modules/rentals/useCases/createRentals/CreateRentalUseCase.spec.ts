import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider.";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let datejsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    datejsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      datejsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "CarTest",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "1234",
      car_id: "1111",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "1234",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There is a rental in progress for user!"));
  });

  it("Should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "123",
      car_id: "car id",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "car id",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "car id",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
