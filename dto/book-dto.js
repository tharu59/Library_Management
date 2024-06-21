// Data Transfer object == Book
class IssuedBook {
  // id is auto generated
  _id;
  name;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnDate;

  //whenever we create obj the constructor gets invoked = Parameterised constructor
  constructor(user) {
    this._id = user.issuedBook._id;
    this.name = user.issuedBook.name;
    this.genre = user.issuedBook.genre;
    this.price = user.issuedBook.price;
    this.publisher = user.issuedBook.publisher;
    this.issuedBy = user.issuedBy;
    this.issuedDate = user.issuedDate;
    this.returnDate = user.returnDate;
  }
}
module.exports = IssuedBook;
