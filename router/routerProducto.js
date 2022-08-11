const express = require('express');
const { Router } = express;
const Productos = require('../controller/productos')

const router = Router();
const productos = new Productos();

//Middleware
middlewareAdmin = (req,res,next)=>{
    console.log(`pasa por aca primero.   hola ${req.body.admin}`);
    next();    
}

// API GET listar todos los productos disponibles ó un producto por su id
router.get('/:id?',(req,res)=>{
    if (req.params.id == undefined) {
        res.send(productos.getAll());
    }else{
        res.send(productos.getForId(req.params.id)); 
    }
})

//API POST incorporar productos al listado
router.post('/',(req,res)=>{
    res.send(productos.add(req.body))
})

//API PUT Actualiza un producto por su id
router.put('/:id',(req,res)=>{
    res.send(productos.update(req.params.id,req.body))
})

//API DELETE Borra un producto por su id
router.delete('/:id',(req,res)=>{
    res.send(productos.delete(req.params.id))
})

module.exports = router;