import startDatabaseConnection from '../infra/database/typeorm';

console.log('Starting database connection...');

startDatabaseConnection()
  .then(async () => {
    console.log('Database connection success');

    try {
      console.log('Starting server...');

      const app = (await import('./config/app')).default;

      app.listen(process.env.APP_PORT, () => {
        console.log(
          `Server running at http://localhost:${process.env.APP_PORT}\n`
        );
      });
    } catch (error) {
      console.log('---------------------------------------');
      console.log('---- Server initialization failure ----');
      console.log('---------------------------------------');

      console.log('\n');

      console.log(error);
    }
  })
  .catch(err => {
    console.log('-------------------------------------');
    console.log('---- Database connection failed ----');
    console.log('-------------------------------------');

    console.log('\n');

    console.error(err);
  });
