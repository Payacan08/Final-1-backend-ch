const fs = require('fs');
const Productos = require('../controller/productos')
const time = new Date;

const producto = new Productos();

//carrito => id, timestamp, productos

class Carrito{
    constructor(){
        this.ruta = './controller/data/carrito.txt'
    }

    //Crear carrito
    create(){
        let object, json=[], id=1;
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8',));
            json.forEach(element => {
                if (element.id>=id){
                    id = element.id + 1;
                }
            });           
        } catch (error) {
            console.log("Se creara documento.");
        }
        
        object = {id:id, timestamp: Date.now() ,productos:[]}
        json.push(object);
        try {
            fs.writeFileSync(this.ruta, JSON.stringify(json))
            return object.id.toString()  
        } catch (error) {
            console.log("Error al escribir en documento");
            return "Error al crear carro"
        }     
    } 

    //agregar productos a carrito
    addProducto(idCarrito,idProducto){
        let json=[],newJson = [],  existeCarrito=false, existeProducto=false
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8'));          
        } catch (err) {
            console.log(err);
        }
        json.forEach(element=>{
            if(element.id == idCarrito){
                existeCarrito = true
                element.productos.push(producto.getForId(idProducto))
            }
            newJson.push(element)
        })

        try {
            fs.writeFileSync(this.ruta, JSON.stringify(newJson))
        } catch (error) {
            console.log("Error al escribir en documento");
            return "Error al modificar carro"
        }
    }

    //Obtener productos de un carrito por su Id
    getForId(id){
        let json=[], existe=false
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8'));          
        } catch (err) {
            console.log(err);
        }
        json.forEach(element=>{
            if(element.id == id){
                json = element;
                existe= true
            }
        })

        if (existe) {
            return json.productos
        }else{
            return {error: 'carrito no encontrado'}
        }
    }

    //elimina carrito
    delete(id){
        let json=[], existe=false;
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8',));          
        } catch (error) {
            console.log(err);
            return 'Error al eliminar carrito'
        }
        json = json.filter(element => {
            if (element.id == id) {
                existe= true
            } else {
                return element
            }
        }); 
        try {
            fs.writeFileSync(this.ruta, JSON.stringify(json))   
        } catch (error) {
            console.log("Error al escribir en documento");
            return 'Error al eliminar carrito'
        }

        if (existe) {
            return 'Carrito Eliminado'
        }else{
            return {error: 'carrito no encontrado'}
        }
    }

    deleteProducto(carritoId, productoId){
        let json=[], newJson = [], existeCarrito=false, existeProducto=false
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8'));          
        } catch (err) {
            console.log(err);
        }
        newJson = json.map(element=>{
            if(element.id == carritoId){
                existeCarrito= true;
                element.productos = element.productos.filter(element => {
                    if (element.id == productoId) {
                        existeProducto= true
                    } else {
                        return element
                    }
                });              
            }
            return element
        })

        try {
            fs.writeFileSync(this.ruta, JSON.stringify(newJson))   
        } catch (error) {
            console.log("Error al escribir en documento");
            return 'Error al eliminar producto'
        }

        if (existeCarrito && existeProducto) {
            return 'Producto Eliminado'
        }else if(!existeCarrito){
            return {error: 'carrito no encontrado'}
        }else if(!existeProducto){
            return {error: 'producto no encontrado'}
        }
    }
        

}

module.exports = Carrito;