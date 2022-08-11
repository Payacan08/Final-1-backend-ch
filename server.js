const express = require('express');
const routerProducto = require('./router/routerProducto');
const routerCarrito = require('./router/routerCarrito');

const app = express();
const server = app.listen(8080,()=>{
    console.log("Server On");
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'))
app.use('/productos', routerProducto);
app.use('/carrito', routerCarrito);

app.get('/',(req,res)=>{
    res.sendFile('index.html', {root:__dirname})
})