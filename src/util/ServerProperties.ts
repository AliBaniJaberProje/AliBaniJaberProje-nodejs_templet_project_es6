import * as PropertiesReader from 'properties-reader';

class ServerProperties {

    static serverConfig: any = PropertiesReader('config/server_config.properties');

    public static getEnv(): string {
        return ServerProperties.serverConfig.get('SERVER.NODE_ENV');
    }
    public static getPort(): number {
        return ServerProperties.serverConfig.get('SERVER.PORT');
    }
    public static getRateLimitRequest(): number {
        return ServerProperties.serverConfig.get('SERVER.RATE_LIMIT_REQUEST');
    }
}
export default  ServerProperties;