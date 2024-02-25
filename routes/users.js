const express=require("express");
const { getAllUsers, getSingleUserById, deleteUser, updateUserData, createNewUser, getSubscriptionDetailsById }=require("../controllers/user-controller")
const {users}=require("../data/users.json")

const { UserModel, BookModel } = require("../models");
const { create } = require("../models/user-model");
// const { getSingleBookById } = require("../controllers/book-controller");
const router=express.Router();

router.get("/",getAllUsers);
router.get("/:id",getSingleUserById);
router.post("/",createNewUser)
router.put("/:id",updateUserData);
router.get("/:id",deleteUser);
router.get("/subscription-details/:id", getSubscriptionDetailsById);
module.exports=router

