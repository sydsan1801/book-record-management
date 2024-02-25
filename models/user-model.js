const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const userSchema=new Schema(
    // issuedBook in users is foreign key and id in books is primary key
    {
        name:{
            type:String,
            required:true,
        },
        surname:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        issuedBook:{
            type:mongoose.Schema.Types.ObjectId,
            // ref the table Book for issedBook 
            ref:"Book",
            // not mandatory to issue a book
            required:false,
        },
        returnDate:
        {
            type: String,
            // if book not issued it is not mandatory
            required: false,
        },
        subscriptionType:{
            type:String,
            required:true,
        },
        subscriptionDate:{
            type:String,
            required:true,
        },   
    },
{
    timestamps:true,
}
);


module.exports = mongoose.model("User", userSchema)
