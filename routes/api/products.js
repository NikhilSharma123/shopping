const express=require('express')
const multer=require('multer')
const Product = require('../../db').product
const route =express.Router(); 


route.get('/', (req, res) => {
    // Get all products
    Product.findAll()
        .then((products) => {
            //sconsole.log(req.user.username)
            res.status(200).send(products)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })
}) 

route.post('/', (req, res) => {
    // Validate the values
    if (isNaN(req.body.price)) {
        return res.status(403).send({
            error: "Price is not valid number"
        })
    }
    
})

exports = module.exports = route