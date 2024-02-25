const mongoose=require("mongoose");

function DbConnection(){
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
}
const db=mongoose.connection;
// bind the error to the console ->console.error statement is in red color ,console.log->white

db.on("error",console.error.bind(console,"Connection Error"));

// db should be connected to the application only once
db.once("open",function(){
    console.log("DB Connected!!")
})


// export the function
module.exports=DbConnection;