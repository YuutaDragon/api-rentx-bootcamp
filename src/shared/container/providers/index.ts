import { container } from "tsyringe";

import { IDateProvider } from "./dateProvider/IDateProvider";
import { DayjsDateProvider } from "./dateProvider/implementations/DayjsDateProvider.";
import { IMailProvider } from "./mailProvider/IMailProvider";
import { EtherealMailProvider } from "./mailProvider/Implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  LocalStorageProvider
);
