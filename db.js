 const sequelize=require('sequelize')

const db=new sequelize('amazon','shopper','mypass',{
    host: 'localhost',
    dialect: 'mysql',
    pool:{
        min: 0,
        max: 5
    } 
})

const user=db.define('users',{
    username: {
        type: sequelize.STRING,
        allowNull : false
    },
    password: {
        type: sequelize.STRING,
        allowNull : false
    },
    firstName: {
        type: sequelize.STRING,
        allowNull : false
    },
    lastName:{
        type: sequelize.STRING,
        allowNull:false
    }
})

const chat=db.define('chats',{
   sender:{
       type: sequelize.STRING,
       allowNull: false
   },
   receiver:{
       type: sequelize.STRING,
       allowNull:false
   }
//    chat:{
//        type:
//    }
})

const product=db.define('products',{
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    manufacturer: {
            type: sequelize.STRING,
            allowNull : false
    },
    userid:{
     type: sequelize.INTEGER
    },
    price:{
        type:sequelize.FLOAT
    },
    image:{
        type:sequelize.STRING
    },
    description:{
        type: sequelize.STRING
    }
    

})

db.sync().then(()=>console.log("database synched")).catch(()=>console.log('database not synched'));

exports=module.exports={
  user,
  product
}





