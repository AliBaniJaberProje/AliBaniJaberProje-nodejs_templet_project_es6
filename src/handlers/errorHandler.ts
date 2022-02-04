import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';
import path from 'path';
const tsFormat = () => (new Date().toISOString());

const errorLog =  winston.createLogger({
  transports: [
      new winston.transports.File({
        filename: '../logs/errors.log',
        level: 'info'
      })
  ]
});

export function unCoughtErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  errorLog.info(err);
  res.end({ error: err });
}

export function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  message: string,
) {
  const error: object = { Message: message, Request: req, Stack: err };
  errorLog.info(error);
  res.json({ Message: message });
}
