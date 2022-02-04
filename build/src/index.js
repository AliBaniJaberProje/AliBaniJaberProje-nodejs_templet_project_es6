"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const winston = require("winston");
const rateLimit_1 = require("./middlewares/rateLimit");
const errorHandler_1 = require("./handlers/errorHandler");
const routes_1 = require("./routes");
// import {swaggerUi} from 'swagger-ui-express';
// import {swaggerJsDoc} from 'swagger-jsdoc';
// app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
class Server {
    constructor(app) {
        this.config(app);
        new routes_1.default(app);
        this.app = app;
    }
    config(app) {
        // const swaggerOptions = {
        //   info: {
        //     title: "Customer API",
        //     description: "Customer Api Information",
        //     contact: {
        //       name: "Amazing Developer"
        //     },
        //     servers: ["localhost:3000"]
        //   },
        //   apis: ["./routes/index.js"]
        // }
        //
        // const swaggerDocs = swaggerJsDoc(swaggerOptions);
        // app.use("/api-docs",swaggerUi.server,swaggerUi.setup(swaggerDocs));
        const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), { flags: 'a' });
        app.use(morgan('combined', { stream: accessLogStream }));
        app.use((0, express_1.urlencoded)({ extended: true }));
        app.use((0, express_1.json)());
        app.use(helmet());
        app.use((0, rateLimit_1.default)()); //  apply to all requests
        app.use(errorHandler_1.unCoughtErrorHandler);
    }
    runServer(port) {
        this.app.listen(port, 'localhost', function () {
            console.info(`Server running on : http://localhost:${port}`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log('server startup error: address already in use');
            }
            else {
                console.log(err);
            }
        });
    }
}
exports.default = Server;
process.on('beforeExit', function (err) {
    winston.error(JSON.stringify(err));
    console.error(err);
});
