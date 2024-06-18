const [UserModal, BookModal] = require("../modals");

// const getAllBooks = () => {};
exports.getAllBooks = async (req, res) => {
  const books = await BookModal.find();

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No books found",
    });
  }
  res.status(200).json({
    success: true,
    data: books,
  });
};

exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModal.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
      // data: books,
    });
  }
  return res.status(200).json({
    success: true,
    message: "Found the Book by their id ",
    data: book,
  });
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true },
  }).populate("issuedBook");

  // DTO ==>Data Transfer Object
  // const issuedBooks = users.map((each) => new issuedBook(each));
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Have Been Issued Yet...",
      data: issuedBooks,
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users with the Issued Books",
    data: issuedBooks,
  });
};

// modules.exports = { getAllBooks, getSingleBookById };
