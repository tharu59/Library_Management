const express = require("express");
const { users } = require("../data/users.json");

// const { router } = require("express");
const router = express.Router();

// http://localhost/users
/**
 * Route: /users
 * Method: GET
 * Description:Get all users
 * Access: public
 * Parameters: NONE
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

// http://localhost/users/4(id)
/**
 * Route: /;id
 * Method: GET
 * Description:Get single user by their id
 * Access: public
 * Parameters: id
 */

router.get("/:id", (req, res) => {
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
 * Route: /
 * Method: POST
 * Description: Creating a new user
 * Access: public
 * Parameters: NONE
 */

router.post("/", (req, res) => {
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

/**
 * Route: /:id
 * Method: Put
 * Description: updating a user by their id
 * Access: public
 * Parameters: ID
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exists",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User Updated successfully",
    data: updateUserData,
  });
});

/**
 * Route: /:id
 * Method: Delete
 * Description: Deleting a user by their id
 * Access: public
 * Parameters: ID
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exists",
    });
  }
  //need to build logic
  const index = users.indexOf(user);
  users.splice(index, 1);
  return res
    .status(200)
    .json({ success: true, message: "Deleted user...", data: users });
});

module.exports = router;
