//Funciones
//  Plantilla Card Productos
plantillaProductos = (element,admin)=>{
    if (admin) {
        let html = `<div class="card" id="${element.id}" style="width: 18rem;">
            <img src="${element.URL}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.description}</p>
                <a href="#" class="btn actualizar btn-primary">actualizar</a>
                <a href="#" class="btn btn-primary">eliminar</a>
            </div>
        </div>`
        return html
    } else {
        let html = `<div class="card" id="${element.id}" style="width: 18rem;">
            <img src="${element.URL}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.description}</p>    
            </div>
        </div>`
        return html
}}

//  Plantilla Card Modificar Producto
plantillaIdProducto = (element)=>{
    let html = `<div class="card" id="${element.id}" style="width: 18rem;">
            <img src="${element.URL}" class="card-img-top" alt="...">
            <div class="card-body">
            <input type="text" value=${element.name}">
            <input type="text" value=${element.description}">
            </div>
        </div>`
}

//  GET Solicitud de productos 
getProductos = ()=>{
    fetch('http://localhost:8080/productos',{method:'GET'})
    .then(res=>res.json())
    .then(res=>{
        let html = ''
        res.map(element=>{
        html = html + plantillaProductos(element,admin)
    })
    document.getElementsByClassName('productos').innerHTML = html;
})}


//Event
const adminSwitch = document.getElementById('adminSwitch');
adminSwitch.addEventListener("change",(e)=>{
    let check = e.target
    if (check.checked) {
        admin = true;
        getProductos()
    }else{
        admin = false;
        getProductos()
}})



//inicio
let admin = false
getProductos()




