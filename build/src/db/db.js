"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ServerProperties_1 = require("../util/ServerProperties");
const config_json_1 = require("@popovmp/config-json");
class DataBaseConnector {
    constructor() {
        this.ERROR_MSG_DATA_BASE_CONFIG = 'Please check config.json file and server_config.properties';
        (0, config_json_1.init)('config/');
        this.readConfigProperties();
        this.validateParameter();
        this.connectDataBase();
    }
    static getInstance() {
        if (!DataBaseConnector.instance) {
            DataBaseConnector.instance = new DataBaseConnector();
        }
        return this.instance;
    }
    readConfigProperties() {
        const env = ServerProperties_1.default.getEnv();
        const databaseConfig = (0, config_json_1.configGet)(env);
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
        return __awaiter(this, void 0, void 0, function* () {
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
            yield this.sequelize.sync();
        });
    }
}
exports.default = DataBaseConnector.getInstance().sequelize;
