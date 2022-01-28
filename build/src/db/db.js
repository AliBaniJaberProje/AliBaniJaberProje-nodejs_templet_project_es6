"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ServerProperties_1 = require("../util/ServerProperties");
const config_json_1 = require("@popovmp/config-json");
class DataBaseConnector {
    constructor() {
        this.ERROR_MSG_DATA_BASE_CONFIG = 'Please check config.json file and server_config.properties';
        config_json_1.initConfig('config/');
        this.readConfigProperties();
        this.validateParameter();
        this.connectDataBase();
    }
    readConfigProperties() {
        const env = ServerProperties_1.default.getEnv();
        const databaseConfig = config_json_1.configGet(env);
        console.log(databaseConfig);
        this.dbPort = Number(databaseConfig['db_port']);
        this.dbName = databaseConfig['database'];
        this.dbUserName = databaseConfig['username'];
        this.dbPassword = databaseConfig['password'];
        this.dialect = databaseConfig['dialect'];
    }
    validateParameter() {
        if (!this.dbUrl && !this.dbName && !this.dbUserName) {
            console.log(this.ERROR_MSG_DATA_BASE_CONFIG);
            process.exit(0);
        }
    }
    connectDataBase() {
        const optionsObj = { benchmark: true, logging: console.log, host: this.dbUrl,
            dialect: this.dialect,
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
