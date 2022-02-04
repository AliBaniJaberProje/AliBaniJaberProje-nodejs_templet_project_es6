import * as RateLimit from 'express-rate-limit';
import ServerProperties from '../util/ServerProperties';
const env = ServerProperties.getEnv();
const rateLimitRequest = ServerProperties.getRateLimitRequest();
const rateLimitTime = ServerProperties.getRateLimitTime();

export default () => {
  if (env === 'production') {
    return new RateLimit({
      windowMs: rateLimitTime * 60 * 1000, // 15 minutes
      max: rateLimitRequest, // limit each IP to 30 requests per windowMs
      delayMs: 0,
      handler: 'Rate limt exceeded, please try again later some time.',
    });
  }
  return new RateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3000, // limit each IP to 3000 requests per windowMs
    delayMs: 0,
    handler: 'Rate limt exceeded, please try again later some time.',
  });
};
