import  { Sequelize, Options } from 'sequelize';
import * as PropertiesReader from 'properties-reader';
import ServerProperties from '../util/ServerProperties';

class DataBaseConnector {
  private DATA_BASE_CONFIG_FILE: string = 'config/db_config.properties';
  private ERROR_MSG_DATA_BASE_CONFIG: string = 'Please check db_config.properties file';
  private dbPort!: number;
  private dbName!: string;
  private dbUserName!: string;
  private dbPassword!: string;
  private dbUrl!: string;
  configDBReader!: any;

  public sequelize!: Sequelize;
  constructor() {
    this.configDBReader = PropertiesReader(this.DATA_BASE_CONFIG_FILE);
    this.readConfigProperties();
    this.validateParameter();
    this.connectDataBase();
  }
  private readConfigProperties(): void {
    this.dbPort = Number(this.configDBReader.get('DB.PORT'));
    this.dbName = this.configDBReader.get('DB.NAME');
    this.dbUserName = this.configDBReader.get('DB.USERNAME');
    this.dbPassword = this.configDBReader.get('DB.PASSWORD');
  }
  private validateParameter(): void {
    if (!this.dbUrl && !this.dbName && !this.dbUserName) {
      console.log(this.ERROR_MSG_DATA_BASE_CONFIG);
      process.exit(0);
    }
  }
  private connectDataBase(): void {
    const optionsObj: object = { benchmark: true, logging: console.log ,host: this.dbUrl,
      dialect: 'mysql',
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


