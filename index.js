const express=require("express");
const dotenv=require("dotenv");
const DbConnection=require("./databaseConnection.js");

const userRouter = require("./routes/users.js")
const bookRouter = require("./routes/books")

// call/activate dotenv
dotenv.config();

const app=express()


// call DbConnection function
DbConnection();
const port=3000;

app.use(express.json());
app.use("/users", userRouter)
app.use("/books", bookRouter)

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Server is up and running",
        data:"Hello"
    })
})

app.get("*",(req,res)=>{
    return res.status(404).json({
        message:"This route does not exist",
    })
})

app.listen(port,()=>{
    console.log(`Server is running at port number ${port}`)
})

