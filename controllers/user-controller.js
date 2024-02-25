const {UserModel,BookModel}=require("../models");
const { unsubscribe } = require("../routes/users");
const { find } = require("../models/user-model");

exports.getAllUsers=async(req,res)=>{
    // find() finds all the users  row in the table
    const users=await UserModel.find();
    if(users.length===0){
        return res.status(404).json({
            success:false,
            message:"No Users found in the database"
        });
    }
    return res.status(200).json({
        success:true,
        message:"These are Users info",
        data:users,
    });
};

exports.getSingleUserById=async(req,res)=>{
    const {id}=req.params;
    // const user=await UserModel.findById(id);
    const user=await UserModel.findById({_id:id});
    if(!user)
    {
        return res.status(404).json({
            success:false,
            message:"User does not exist",
        });
    }
    return res.status(200).json({
        success:true,
        message:"User found",
        data:user,
    });
};

exports.createNewUser=async(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate}=req.body;
    const newUser=await UserModel.create({
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    })
    return res.status(200).json({success:true,message:"New user added successfully",data:newUser})
   
}

exports.updateUserData = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const updatedUserData = await UserModel.findOneAndUpdate(
        { _id: id },
        // updating so ...data and not assigning
        { $set: { ...data } },
        // to reload and get updated data
        { new: true }
    );

    return res.status(200).json({
        sucess: true,
        message: "User Updated !!",
        data: updatedUserData,
    });
};

exports.deleteUser=async(req,res)=>{
    const {id}=req.params;
    // if ids are same then delete
    const user=await UserModel.deleteOne({_id:id});
    if(!user)
    {
        return res.status(404).json({
            success:false,
            message:"User does not exist!!",
        });
    }
    return res.status(200).json({
        success:true,
        message:"Deleted the User",
        data:user,
    });
};

exports.getSubscriptionDetailsById = async (req, res) => {
    const { id } = req.params;
    // find({_id:id})
    const user = await UserModel.findById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User With The ID Didnt Exist",
        });
    }

    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            date = new Date();
        } else {
            date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    };

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        } else if (user.subscriptionType === "Standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    };
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        isSubscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration:
            subscriptionExpiration <= currentDate
                ? 0
                : subscriptionExpiration - currentDate,
        fine:
            returnDate < currentDate
                ? subscriptionExpiration <= currentDate
                    ? 100
                    : 50
                : 0,
    };
    return res.status(200).json({
        success: true,
        message: "Subscription detail for the user is: ",
        data,
    });
}