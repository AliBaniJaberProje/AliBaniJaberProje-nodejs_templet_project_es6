"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const index_1 = require("./src/index");
const ServerProperties_1 = require("./src/util/ServerProperties");
const cluster = require("cluster");
const os_1 = require("os");
const app = express();
const server = new index_1.default(app);
const port = ServerProperties_1.default.getPort();
if (ServerProperties_1.default.ismMultiProcessesMode()) {
    if (cluster.isMaster) {
        console.log(`Total Number of CPU Counts is ${(0, os_1.cpus)().length}`);
        for (let i = 0; i < (0, os_1.cpus)().length; i++) {
            cluster.fork();
        }
        cluster.on('online', worker => {
            console.log(`Worker Id is ${worker.id} and PID is ${worker.process.pid}`);
        });
        cluster.on('exit', worker => {
            console.log(`Worker Id ${worker.id} and PID is ${worker.process.pid} is offline`);
            console.log("Let's fork new worker!");
            cluster.fork();
        });
        cluster.on('errored', (workerId) => {
            console.log('bay' + workerId.pid);
        });
    }
    else {
        server.runServer(port);
    }
}
else {
    server.runServer(port);
}
