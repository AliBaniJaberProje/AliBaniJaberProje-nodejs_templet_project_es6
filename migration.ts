import sequelize from './src/db/db';
import { Umzug, SequelizeStorage } from 'umzug';

const umzug = new Umzug({
  migrations: { glob: './src/migration/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {

  try {
    await umzug.up();
  } catch (error) {
    console.error(error);
  }
})();
