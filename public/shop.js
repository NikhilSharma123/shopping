function fetchProducts (done) {
    $.get('/api/products', function (data) {
        done(data)
    })
}

let socket = io();
socket.on('connection', () => {
    console.log("Connected " + socket.id)
})

socket.on('recv', function (data) {
  console.log(data)
  socket.emit('my other event', { my: 'data' })
})
 
function createProductCard (product) {
    return $(` 
    <div class="col-3 card m-2 p-0">
    <img src="/uploads/${product.image}"  style='height:240px;width:100%;' >
        <h4 class="product-name">Product: ${product.name}</h4>
        <div class="product-manufacturer">Manufacturer: ${product.manufacturer}</div>
        <div class="product-description">Description: ${product.description}</div>
        <div class="product-description">Userid: ${product.userid}</div>
        <div class="product-price">Price : Rs. ${product.price}</div>
        <div class="row">
        <button class="col btn btn-primary m-3">Buy</button>
        </div>
        </div>
    `
        )
}