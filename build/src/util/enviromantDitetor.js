"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PropertiesReader = require("properties-reader");
class EnviromantDitetor {
    constructor() {
        this.PRODUCTION = 'production';
        this.DEVELOPMENT = 'development';
        this.QA = 'QA';
        this.SERVER_CONFIG_FILE = 'config/server_config.properties';
        this.configENVReader = PropertiesReader(this.SERVER_CONFIG_FILE);
        this.env = this.configENVReader.get('SERVER.NODE_ENV');
    }
    isProductionENV() {
        return this.env == this.PRODUCTION;
    }
    isDevelopmentENV() {
        return this.env == this.DEVELOPMENT;
    }
    isQA_ENV() {
        return this.env == this.QA;
    }
}
exports.default = new EnviromantDitetor();
