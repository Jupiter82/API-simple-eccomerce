const { required } = require('joi');
const mongoose = require('mongoose');
const { forgetPassword } = require('../auth/auth.request');

const UserSchemaDef = new mongoose.Schema({
    name:{
        type:String,
        min:2,
        max:50,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type: String
    },
    activationToken:String,
    role:{
        type:String,
        enum:["superadmin","admin"],
        default:"admin"
    },
    forgetPasswordToken:String,
    address:{
        temporary: String,
        permanent: String
    },
    image:String,
    status:{
        type:String,
        enum:["activated","notactivated",'suspended',"deleted"],
        default:"notactivated"
    },
    dateOfBirth:Date
},{
    timestamps: true,             //CreatedAt, updatedAt
    autoCreate: true,
    autoIndex: true
})

const UserModel = mongoose.model("User",UserSchemaDef)
module.exports = UserModel;

