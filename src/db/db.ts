import  { Sequelize, Options } from 'sequelize';
import ServerProperties from '../util/ServerProperties';
import { configGet, initConfig } from '@popovmp/config-json';

class DataBaseConnector {
  private ERROR_MSG_DATA_BASE_CONFIG: string = 'Please check config.json file and server_config.properties';
  private dbPort!: number;
  private dbName!: string;
  private dbUserName!: string;
  private dbPassword!: string;
  private dbUrl!: string;
  dialect!: string;

  public sequelize!: Sequelize;
  constructor() {
    initConfig('config/');
    this.readConfigProperties();
    this.validateParameter();
    this.connectDataBase();
  }
  private readConfigProperties(): void {
    const env: string = ServerProperties.getEnv();
    const databaseConfig: any = configGet(env);
    console.log(databaseConfig);
    this.dbPort = Number(databaseConfig['db_port']);
    this.dbName = databaseConfig['database'];
    this.dbUserName = databaseConfig['username'];
    this.dbPassword = databaseConfig['password'];
    this.dialect = databaseConfig['dialect'];
  }
  private validateParameter(): void {
    if (!this.dbUrl && !this.dbName && !this.dbUserName) {
      console.log(this.ERROR_MSG_DATA_BASE_CONFIG);
      process.exit(0);
    }
  }
  private connectDataBase(): void {
    const optionsObj: object = { benchmark: true, logging: console.log ,host: this.dbUrl,
      dialect: this.dialect,
      port: this.dbPort};

    const options: Options = optionsObj;
    this.sequelize = new Sequelize(this.dbName, this.dbUserName, this.dbPassword, options);
    this.sequelize
        .authenticate()
        .then(() => {
          console.log('Connection has been established successfully..');
        })
        .catch(err => {
          console.error('Unable to connect to the database:', err);
        });
  }
}
export default new DataBaseConnector().sequelize;


