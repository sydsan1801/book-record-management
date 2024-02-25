// const { UserModel, BookModel } = require("../models/index")
const { UserModel, BookModel } = require("../models");

const issuedBook=require("../dtos/book-dto")

// async since fetching info from database will take some time
exports.getAllBooks=async(req,res)=>{
    // fetch all books (info) from BookModel into books
    const books = await BookModel.find();
    console.log(books)
    if(books.length===0){
        // no value fetched 
        return res.status(404).json({
            success:false,
            message:"No book found"
        })
    }
    res.status(200).json({
        succes:true,
        // from BookModel table ,books->array returning multiple elements
        data:books,
    })
}

// const getAllBooks=()=>{};

// const getSingleBookById=()=>{};

exports.getSingleBookById = async(req,res)=>{
    const {id}=req.params;
    const book=await BookModel.findById(id);
    if(!book){
        res.status(404).json({
            success:false,
            message:"Book noy found by their id",
        });
    }
    return res.status(200).json({
        success:true,
        messgae:"Found the book by their id",
        data:book,
    });

};

exports.getAllIssuedBooks=async(req,res)=>{
    // users->userObject calling in dto
    const users=await UserModel.find({
        // since issuedBook is optional therefore check if the attribute exists asign/populate to users
        issuedBook:{$exists:true}
    }).populate("issuedBook");

    // Data Transfer Object (DTO)->transfer data between objects

    //call DTO 
    const issuedBooks=users.map((each)=>new issuedBook(each))
    if(issuedBooks.length===0)
    {
        return res.status(404).json({
            success:false,
            message:"No book have been issued yet",
        })
    }
    return res.status(200).json({
        success:true,
        message:"User with the issued books..",
        data:issuedBooks,
    })

};

exports.addNewBook=async(req,res)=>{
    const {data}=req.body;
    if(!data)
    {
        return res.status(404).json({
            success:false,
            message:"No data to add a book",
        });
    }

    // info passed in create and adds a new row
    // use await for insertion deletion updation in database
    // create a new row
    await BookModel.create(data);
    // in rare cases if two ids are same, find ->finds all books in the row of Bookmodel and store in allBooks
    const allBooks=await BookModel.find();
    return res.status(201).json({
        success:true,
        message:"Added book successfully",
        data:allBooks,
    });``
}

exports.updateBookById=async(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    const updatedBook =await BookModel.findOneAndUpdate(
    {
// _id in the BookModel === id in req.params ,update in the data ,fetch updated data(no need of spread operator)
        _id:id,
    },
    data,
    {
        // to get the updated data
        new:true,
    }
    );

    return res.status(200).json({
        success: true,
        message: "Updated a book by their id",
        data: updatedBook,
    });
}

// module.exports={getAllBooks,getSingleBookById};

