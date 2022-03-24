function printError(message: string) {
  console.log('\x1b[31m%s\x1b[0m', message);
}

async function setupEnv() {
  try {
    console.log('⏳ Setup .env variables...');

    const { config } = await import('dotenv');

    config();

    console.log('🍌 Env setup done!');

    return true;
  } catch (error) {
    printError('--------------------------------------');
    printError('----- Fail to load the .env file -----');
    printError('--------------------------------------');

    console.log('\n');

    console.error(JSON.stringify(error, null, 2));

    return false;
  }
}

async function importAppDataSource() {
  try {
    const { AppDataSource } = await import('@infra/database/typeorm');

    return AppDataSource;
  } catch (error) {
    printError('---------------------------------------------');
    printError('----- Fail to load the data source file -----');
    printError('---------------------------------------------');

    console.log('\n');

    console.error(JSON.stringify(error, null, 2));

    return null;
  }
}

async function connectToDatabase() {
  const dataSource = await importAppDataSource();

  if (!dataSource) {
    return false;
  }

  try {
    console.log('⏳ Connecting to the database...');

    await dataSource.initialize();

    console.log('👌 Connection established!');

    return true;
  } catch (error) {
    printError('--------------------------------------');
    printError('----- Database connection failed -----');
    printError('--------------------------------------');

    console.log('\n');

    console.error(JSON.stringify(error, null, 2));

    return false;
  }
}

async function initializeServer() {
  console.log('⏳ Starting server...');

  try {
    const app = (await import('./config/app')).default;

    app.listen(process.env.API_PORT, () => {
      console.log(
        `🚀 Server is running at ${process.env.API_URL}:${process.env.API_PORT}\n`
      );
    });
  } catch (error) {
    printError('-----------------------------------------');
    printError('----- Server initialization failure -----');
    printError('-----------------------------------------');

    console.log('\n');

    console.log(JSON.stringify(error, null, 2));
  }
}

async function initialize() {
  const envOk = await setupEnv();

  if (!envOk) {
    return;
  }

  const databaseOk = await connectToDatabase();

  if (!databaseOk) {
    return;
  }

  await initializeServer();
}

initialize();
