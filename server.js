const express = require("express");
const logger = require("./logger/logger");
const app = express();
const port = 3000;

app.get("/login", (request, response) => {
    logger.info("Login Page Accessed");
    response.send("Hello World!");
});

//Initialises the express server on the port 3000
app.listen(port, () => logger.info(`Server listening on port ${port}!`));
