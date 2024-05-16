const express = require("express");
const dotenv = require("dotenv");
const DbConnection = require("./databaseConnection.js");
// const { users } = require("./data/users.json");
// const { books } = require("./data/books.json");
const userRouter = require("./routes/users.js");
const booksRouter = require("./routes/books");

dotenv.config();

const app = express();
DbConnection();
const PORT = 8081;

app.use(express.json());

// http://localhost:8081/
http: app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and running:-)",
    data: "hey",
  });
});

app.use("/users", userRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
