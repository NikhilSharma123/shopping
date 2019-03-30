const express=require('express')
const route=express.Router()
const multer=require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, next) {
       next(null,require('../../uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.jpg')
 
    }
  })  

route.use('/users',require('./users'))
route.use('/products',require('./products'))

exports=module.exports={
    route
}