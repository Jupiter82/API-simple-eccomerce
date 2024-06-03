const mongoose = require('mongoose')

const BrandSchema = new mongoose.Schema({
    title:{
        type: String,
        min: 2,
        required:true,
        unique:true,
    },
    slug:{
        type: String,
        unique:true,
        required:true,
    },
    tagline:String,
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

const BrandModel = mongoose.model("Brand", BrandSchema)

module.exports = BrandModel;