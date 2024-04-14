const express = require("express");
const { users } = require("./data/users.json");
const { books } = require("./data/books.json");
const app = express();
const PORT = 8081;

app.use(express.json(PORT));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and running:-)",
    data: "hey",
  });
});

// http://localhost/users
/**
 * Route: /users
 * Method: GET
 * Description:Get all users
 * Access: public
 * Parameters: NONE
 */
app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

// http://localhost/users/4(id)
/**
 * Route: /users/;id
 * Method: GET
 * Description:Get single user by their id
 * Access: public
 * Parameters: id
 */

app.get("/users/:id", (req, res) => {
  // const id = req.params.id
  const { id } = req.params;
  console.log(req.params);
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exists",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
});

/**
 * Route: /users/
 * Method: POST
 * Description: Creating a new user
 * Access: public
 * Parameters: NONE
 */

app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User with ID already exists",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "User Added successfully",
    data: users,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
