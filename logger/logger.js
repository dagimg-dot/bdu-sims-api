const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:dd-mm-yyyy, hh:MM:ss",
      ignore: "pid",
    },
  },
});

module.exports = logger;
