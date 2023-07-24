const express = require("express");
const logger = require("./logger/logger");
const login = require("./app/login");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/login", async (request, response) => {
  logger.info("Login Page Accessed");

  try {
    const username = request.body.username;
    const password = request.body.password;

    // logging the username
    logger.info(`Username: ${username}`);

    const credentials = {
      username: username,
      password: password,
    };

    const isValidated = await login(credentials);

    // logging the validation result
    logger.info(`Is Validated: ${isValidated}`);

    response.json(isValidated);
  } catch (error) {
    logger.error(error);
    response.json(error);
  }
});

//Initialises the express server on the port 3000
app.listen(port, () => logger.info(`Server listening on port ${port}!`));
