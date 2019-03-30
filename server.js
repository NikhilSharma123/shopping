const express =require('express')
const multer=require('multer')
const session=require('express-session')
const passport = require('./passport')
const path=require('path')
const http=require('http')
const Product=require("./db").product  
const Users=require("./db").user
const socketio=require('socket.io')
const server=express()
const app=http.createServer(server)
const io=socketio(app)

// const usersockets={}

io.on('connection', (socket) => {
    console.log("New socket formed from " + socket.id)
    socket.emit('connected')

    socket.on('login', (data) => {
        // username is in data.user
        usersockets[data.user] = socket.id
        console.log(usersockets)
    })
})
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/',express.static(__dirname+"/public"))
// server.set('view ')
//server.use(express.cookieParser())
// server.use(express.bodyParser())
server.use(session({
    secret: 'somesecretstring'
    // saveUninitialized: true,
    // resave: true
}))

server.use(passport.initialize())
server.use(passport.session())
server.set('view-engine','ejs')
// server.get('/addproducts',(req,res)=>{
//         if (req.user) {
//             return res.send("Visible to only logged in users")
//         } else {
//             res.redirect('/login')
//         }
// })

server.post('/signup', (req, res) => {
    Users.create ({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then((createdUser) => {
        res.redirect('/login2.html')
    })
})

server.get('/addproducts1',(req,res)=>{
    if (req.user) {
      res.redirect('/addproducts.html')
    } else {
        res.redirect('/login2.html')
    }
})

server.get('/myprod',(req,res)=>{
    Product.findAll({
        where:{
        userid:req.user.id}
    }).then((products)=>{
        if(!products){
            res.send("<h1>NO PRODUCT FOUND<\h1>")
        }
    console.log(products)
      res.render('myprod.ejs',{products: products})
     // res.redirect('./myprod.html')
})})

server.post('/login', passport.authenticate('local'),function(req,res) {
    // failureRedirect: 'login2.html',
    // successRedirect: '/index.html'
    //console.log("In login authentication")
    //console.log(req.user)

    res.redirect('/index.html')
}
)



//set storage
const storage=multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload=multer({
    storage: storage
}
).single('myImage')

//init app
server.use('/api',require('./routes/api').route)

server.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
           // console.log("in upload")
            //console.log(req.user)
            Product.create({
                 userid: req.user.id,
                 name: req.body.name,
                 manufacturer: req.body.manufacturer,
                 price: parseFloat(req.body.price),
                 image: req.file.filename,
                 description: req.body.description
             }).then((product) => {
                 res.status(201).redirect('index.html')
             }).catch((error) => {
                 res.status(501).send({
                     error: "Error adding product"
                 })
             })     
      })
    })
    
    server.get('/logout', function(req, res, next) {
        if (req.session) {
          // delete session object
          console.log("successful logout")
          req.session.destroy(function(err) {
            if(err) {
              return next(err);
            } else {
              return res.redirect('/');
            }
          });
        }
      }); 



app.listen('8044',()=>{
    console.log("localhost://1235")
})