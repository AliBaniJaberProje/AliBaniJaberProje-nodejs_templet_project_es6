import * as PropertiesReader from 'properties-reader';
class ServerProperties {
    private SERVER_CONFIG_FILE: string = 'config/server_config.properties';

    serverConfig!: any;
    constructor() {
        this.serverConfig = PropertiesReader(this.SERVER_CONFIG_FILE);
    }
    public getEnv(): string {
        return this.serverConfig.get('SERVER.NODE_ENV');
    }
    public getPort(): number {
        return this.serverConfig.get('SERVER.PORT');
    }
    public getRateLimitRequest(): number {
        return this.serverConfig.get('SERVER.RATE_LIMIT_REQUEST');
    }
}
export default new ServerProperties();