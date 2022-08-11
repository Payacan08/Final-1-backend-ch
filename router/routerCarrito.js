const express = require('express');
const { Router } = express;
const Carrito = require('../controller/carrito')

const router = Router();
const carrito = new Carrito()

// API GET Permite listar todos los productos guardados en el carrito
router.get('/:id/productos',(req,res)=>{
    res.send(carrito.getForId(req.params.id))
})

// API POST 
//      Crea un carrito y devuelve su id
router.post('/',(req,res)=>{
    res.send(carrito.create())
})
//      Incorpora productos al carrito por su id de producto
router.post('/:id/productos/:id_prod',(req,res)=>{
    res.send(carrito.addProducto(req.params.id,req.params.id_prod))
})

// API DELETE
//      Vacía un carrito y lo elimina
router.delete('/:id',(req,res)=>{
    res.send(carrito.delete(req.params.id))
})
//      Eliminar un producto del carrito por su id de carrito y de producto
router.delete('/:id/productos/:id_prod',(req,res)=>{
    res.send(carrito.deleteProducto(req.params.id,req.params.id_prod))
})

module.exports = router;