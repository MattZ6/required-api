import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

export default async (): Promise<void> => {
  const options = await getConnectionOptions();

  const newOptions = options as IOptions;
  newOptions.host = 'database_authentication_app';

  await createConnection({
    ...options,
  });
};
