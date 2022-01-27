"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const PropertiesReader = require("properties-reader");
class DataBaseConnector {
    constructor() {
        this.DATA_BASE_CONFIG_FILE = 'config/db_config.properties';
        this.ERROR_MSG_DATA_BASE_CONFIG = 'Please check db_config.properties file';
        this.configDBReader = PropertiesReader(this.DATA_BASE_CONFIG_FILE);
        this.readConfigProperties();
        this.validateParameter();
        this.connectDataBase();
    }
    readConfigProperties() {
        this.dbPort = Number(this.configDBReader.get('DB.PORT'));
        this.dbName = this.configDBReader.get('DB.NAME');
        this.dbUserName = this.configDBReader.get('DB.USERNAME');
        this.dbPassword = this.configDBReader.get('DB.PASSWORD');
    }
    validateParameter() {
        if (!this.dbUrl && !this.dbName && !this.dbUserName) {
            console.log(this.ERROR_MSG_DATA_BASE_CONFIG);
            process.exit(0);
        }
    }
    connectDataBase() {
        const optionsObj = { benchmark: true, logging: console.log, host: this.dbUrl,
            dialect: 'mysql',
            port: this.dbPort };
        const options = optionsObj;
        this.sequelize = new sequelize_1.Sequelize(this.dbName, this.dbUserName, this.dbPassword, options);
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
exports.default = new DataBaseConnector().sequelize;
