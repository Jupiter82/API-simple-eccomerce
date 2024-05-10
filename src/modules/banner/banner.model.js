const { required } = require('joi');
const mongoose = require('mongoose')

const BannerSchema = new mongoose.Schema({
    title:{
        type: String,
        min: 3,
        required:true
    },
    subTitle:{
        type: String,
        min:3,
        required:true
    },
    description:{
        type: String,
        min:3,
        required:true
    },
    url:{
        type:String,
        min:3,
        required:true
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default: "inactive"
    },
    image:{
        type: String,
        required:true
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatedBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }
},{
    autoCreate:true,
    autoIndex: true,
    timestamps:true
})

const BannerModel = mongoose.model("Banner", BannerSchema)

module.exports = BannerModel;