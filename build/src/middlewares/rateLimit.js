"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RateLimit = require("express-rate-limit");
const ServerProperties_1 = require("../util/ServerProperties");
const env = ServerProperties_1.default.getEnv();
const rateLimitRequest = ServerProperties_1.default.getRateLimitRequest();
const rateLimitTime = ServerProperties_1.default.getRateLimitTime();
exports.default = () => {
    if (env === 'production') {
        return new RateLimit({
            windowMs: rateLimitTime * 60 * 1000,
            max: rateLimitRequest,
            delayMs: 0,
            handler: 'Rate limt exceeded, please try again later some time.',
        });
    }
    return new RateLimit({
        windowMs: 5 * 60 * 1000,
        max: 3000,
        delayMs: 0,
        handler: 'Rate limt exceeded, please try again later some time.',
    });
};
