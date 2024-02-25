const express=require("express");
const router = express.Router();
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById } = require("../controllers/book-controller");

const { books }=require("../data/books.json")
const { users }=require("../data/users.json")

// import userModel and bookModel
// const BookModel=require("../models/book-model")
// const UserModel=require("../models/user-model")

const { UserModel ,BookModel }=require("../models/index")


router.get("/",getAllBooks);
router.get("/:id",getSingleBookById);
router.get("/issued/by-user",getAllIssuedBooks);
router.post("/",addNewBook);
router.put("/:id", updateBookById);
module.exports=router;