import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import { Application } from 'express';
import Server from './src/index';
import ServerProperties from './src/util/ServerProperties';
import * as cluster from 'cluster';
import { cpus } from 'os';

const app: Application = express();
const server: Server = new Server(app);
const port: number = ServerProperties.getPort();

if (ServerProperties.ismMultiProcessesMode()) {
  if (cluster.isMaster) {
    console.log(`Total Number of CPU Counts is ${cpus().length}`);
    for (let i = 0; i < cpus().length; i++) {
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
} else {
  server.runServer(port);
}
