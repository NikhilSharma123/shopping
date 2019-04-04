//const Products=require('../db').product
$(function () {
    
    // let msglist = $('#msglist')
    // let sendbtn = $('#sendmsg')
    // let msgbox = $('#msgbox')
    // let loginbox = $('#loginbox')
    // let loginbtn = $('#loginbtn')
    // let loginDiv = $('#login-div')
     let chatDiv = $('#chat-div')
     

    // let user = ''

    // sendbtn.click(function () {
    //     socket.emit('send_msg', {
    //         user: user,
    //         message: msgbox.val()
    //     })
    // })

    // loginbtn.click(function () {
    //     user = loginbox.val()
    //     chatDiv.show()
    //     loginDiv.hide()
    //     socket.emit('login', {
    //         user: user
    //     })})

    //     socket.on('recv_msg', function (data) {
    //         msglist.append($('<li>' + data.user + ': ' + data.message + '</li>'))
    //     })

    let login=$('#login')
    let productList = $('#product-list')
   // let Myproducts=$('#Myproducts')
   
   // const productLis=$('#ProductLis')
    // Myproducts.click(function(req,res){
     
    //   })
    // })
    
    login.click(function(){
       location.href='./login2.html'
    })
    // Myproducts.click(function(req,res){
    //     res.send(req.user.datavalues.id)
    // })
    fetchProducts(function (products) {
        productList.empty()
        for (product of products) {
            productList.append(createProductCard(product))
        }
    })

})   