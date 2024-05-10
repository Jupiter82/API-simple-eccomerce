const router = require("express").Router()
// const express = require('express')
// const router = express.Router()


router.route('/users')
    .get((req,res,next)=>{
        let id = req.params.id;
        res.json({
            result: "User Lists",
            message:"User List",
            meta: null
        })
    
    })

    .post((req,res,next)=>{
        let id = req.params.id;  //{id:"",status:"",name:""}
        res.json({
            result: "User Created Successfully",
            message: "User Created Successfully",
            meta: null
        })
    })


// if() -> next
// else  -> res.status(401).json(login)  
// next -> res.status(403).json()
router.route('/user/:id')

//params /? query
    .post((req,res,next)=>{
    let id = req.params.id;  //{id:"",status:"",name:""}
    res.json({
        result: "User Detail of id : " + id,
        message: "User details",
        meta: null
    })
})
    .get((req,res,next)=>{
    let id = req.params.id;  //{id:"",status:"",name:""}
    res.json({
        result: "User Detail of id : " + id,
        message: "User Detail of id : " + id,
        meta: null
    })
})
    .put((req,res,next)=>{
    let id = req.params.id;  //{id:"",status:"",name:""}
    res.json({
        result: "User Updated successfully for id:  " + id,
        message: "User Updated successfully for id: " + id,
        meta: null
    })
})
    .delete((req,res,next)=>{
    let id = req.params.id;  //{id:"",status:"",name:""}
    res.json({
        result: "User Deleted successfully for id:  " + id,
        message: "User Deleted successfully for id: " + id,
        meta: null
    })
})
