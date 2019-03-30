const User=require('../../db').user
const route=require('express').Router()

route.get('/',(req,res)=>{
   User.findAll() 
   .then((users)=>
   {
       res.status(200).send(users)
   }).catch((err)=>{
       res.status(500).send({
           error: "Could not retrieve users"
       })
   })
}) 

route.post('/',(req,res)=>{
    //we expect req to have name in it and we wil create a new u ser
    User.create({
        username: req.body.name,
        password: req.body.password,
        name: req.body.name
    }).then((user)=>{
        res.status(201).send(user)
    }).catch((err)=>{
        res.status(501).send({
            error: "Could not add new user"
        })
    })
})

exports=module.exports=route