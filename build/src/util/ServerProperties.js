"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PropertiesReader = require("properties-reader");
class ServerProperties {
    constructor() {
        this.SERVER_CONFIG_FILE = 'config/server_config.properties';
        this.serverConfig = PropertiesReader(this.SERVER_CONFIG_FILE);
    }
    getEnv() {
        return this.serverConfig.get('SERVER.NODE_ENV');
    }
    getPort() {
        return this.serverConfig.get('SERVER.PORT');
    }
    getRateLimitRequest() {
        return this.serverConfig.get('SERVER.RATE_LIMIT_REQUEST');
    }
}
exports.default = new ServerProperties();
