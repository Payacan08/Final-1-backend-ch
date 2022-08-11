const fs = require('fs');
const time = new Date();

// producto => {id, timestamp, name, description, code, url, price, stock}

class Productos{
    constructor (){
        this.ruta = './controller/data/productos.txt'
    }

    //agregar productos
    add(object){
        let json=[], id=1;
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
        object.id = id;
        object.timestamp = Date.now();
        json.push(object);
        try {
            fs.writeFileSync(this.ruta, JSON.stringify(json))
            return "Producto Agregado"   
        } catch (error) {
            console.log("Error al escribir en documento");
            return "Error al agregar producto"
        }     
    }

    //obtener todos los producto
    getAll(){
        let json=[]
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8'));          
        } catch (err) {
            console.log(err);
        }
        return json;
    }

    //obtener producto por id
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
            return json
        }else{
            return {error: 'producto no encontrado'}
        }
    }

    //actualizar producto
    update(id, object){
        let json=[],existe=false;
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8',));        
        } catch (error) {
            console.log("Documento no encontrado, Se creara documento.");
            return "Datos vacios"
        }

        let newJson = json.map((element)=>{
            if (element.id == id) {
                element.name = object.name
                element.description = object.description
                element.code = object.code
                element.URL = object.URL
                element.price = object.price
                element.stock = object.stock
                element.timestamp = Date.now();
                existe= true
            };
            return element;
        })
        
        try {
            fs.writeFileSync(this.ruta, JSON.stringify(newJson))   
        } catch (error) {
            console.log("Error al escribir en documento");
        }

        if (existe) {
            return 'Producto Actualizado'
        }else{
            return {error: 'producto no encontrado'}
        }    
    }

    //eliminar producto por id
    delete(id){
        let json=[], existe=false;
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8',));          
        } catch (error) {
            console.log(err);
            return 'Error al eliminar producto'
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
            return 'Error al eliminar producto'
        }

        if (existe) {
            return 'Producto Eliminado'
        }else{
            return {error: 'producto no encontrado'}
        }
    }

}

module.exports = Productos;