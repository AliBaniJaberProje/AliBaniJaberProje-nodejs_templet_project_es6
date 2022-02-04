"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = exports.unCoughtErrorHandler = void 0;
const winston = require("winston");
const tsFormat = () => (new Date().toISOString());
const errorLog = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: '../logs/errors.log',
            level: 'info'
        })
    ]
});
function unCoughtErrorHandler(err, req, res, next) {
    errorLog.info(err);
    res.end({ error: err });
}
exports.unCoughtErrorHandler = unCoughtErrorHandler;
function apiErrorHandler(err, req, res, message) {
    const error = { Message: message, Request: req, Stack: err };
    errorLog.info(error);
    res.json({ Message: message });
}
exports.apiErrorHandler = apiErrorHandler;
