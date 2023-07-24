const express = require("express");
const app = express();
const port = 3000;

app.get("/login", (request, response) => {
    response.send("Hello World!");
});

//Initialises the express server on the port 3000
app.listen(port, () => console.log(`Server listening on port ${port}!`));
