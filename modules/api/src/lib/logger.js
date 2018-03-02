import * as winston from "winston";

winston.level = process.env.LOG_LEVEL;
export const log = winston;
