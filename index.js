const express = require("express");
const { users } = require("./data/users.json");
const app = express();
const PORT = 8081;

app.use(express.json(PORT));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and running:-)",
    data: "hey",
  });
});

/**
 * Route: /users
 * Method: GET
 * Description:Get all users
 * Access: public
 * Parameters: NONE
 */

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});