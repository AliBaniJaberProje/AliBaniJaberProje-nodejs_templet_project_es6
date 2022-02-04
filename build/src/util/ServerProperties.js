"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PropertiesReader = require("properties-reader");
class ServerProperties {
    static getEnv() {
        return ServerProperties.serverConfig.get('SERVER.NODE_ENV');
    }
    static getPort() {
        return ServerProperties.serverConfig.get('SERVER.PORT');
    }
    static getRateLimitRequest() {
        return ServerProperties.serverConfig.get('SERVER.RATE_LIMIT_REQUEST');
    }
    static ismMultiProcessesMode() {
        return ServerProperties.serverConfig.get('SERVER.MULTI_PROCESSES_MODE');
    }
    static getRateLimitTime() {
        return ServerProperties.serverConfig.get('SERVER.RATE_LIMIT_TIME');
    }
}
ServerProperties.serverConfig = PropertiesReader('config/server_config.properties');
exports.default = ServerProperties;
