let num_total=0;
document.getElementById("boton1").onclick = function() {sumar(productos[0])};
document.getElementById("boton2").onclick = function() {sumar(productos[1])};
document.getElementById("boton3").onclick = function() {sumar(productos[2])};
document.getElementById("resultado").onclick = function() {total()};
document.getElementById("borrar").onclick=function(){borrar()};
document.getElementById("enviar").onclick=function(){enviar()};
document.getElementById("filtrar1").onclick=function(){Categorias(1)};
document.getElementById("filtrar2").onclick=function(){Categorias(2)};
document.getElementById("filtrar3").onclick=function(){Categorias(3)};
//************************************************************************************************************* */
//************************************************************************************************************* */
//****************************************************Clases*************************************
class Cliente {
    constructor(nombre, direccion,email) {
        // Propiedades
        this.nombreCliente = nombre;
        this.direccionCliente = direccion;
        this.emailCliente = email;
    }
    // Métodos
    mostrarDatos() {
        alert(`${this.nombreCliente} tus productos seran enviados a  ${this.direccionCliente}, te mantendremos al tanto sobre el envio via mail por `+num_total+"+50 de envio");        
    }
}
//************************************************************************************************************* */
class Producto{
    constructor(id,nombre,precio,stock){
        //Propiedades
        this.idProducto=id;
        this.nombreProducto=nombre;
        this.precioProducto=precio;
        this.stockProducto=stock;
    }
    //metodos
    restarStock(){
        this.stockProducto=this.stockProducto-1;
        this.sinStcok();
    }
    sinStcok(){
        if (this.stockProducto<0){
            alert("no hay stock de "+this.nombreProducto)
        }
    }
}
//************************************************************************************************************* */
class Compra{
    constructor(nombre,precio,cantidad){
        //Propiedades
        this.nombreCompra=nombre;
        this.precioCompra=precio;
        this.cantidadCompra=cantidad;
    }
}
//************************************************************************************************************* */
document.getElementById("box").innerHTML=""
document.getElementById("box").innerHTML = `
<div class="box-Item">
    <div class="box-Item-interior">
        <div class="box-Item-frente">
            
            <p>${productos[0].nombreProducto}</p>
        </div>
        <div class="box-Item-atras">
            <p>$${productos[0].precioProducto}</p>
        <button id="boton1">Agregar</button>
    </div>
</div>
</div>
<div class="box-Item">
    <div class="box-Item-interior">
        <div class="box-Item-frente">
            
            <p>${productos[1].nombreProducto}</p>
        </div>
        <div class="box-Item-atras">
            <p>$${productos[1].precioProducto}</p>
        <button id="boton2">Agregar</button>
    </div>
</div>
</div>
<div class="box-Item">
    <div class="box-Item-interior">
        <div class="box-Item-frente">
            
            <p>${productos[2].nombreProducto}</p>
        </div>
        <div class="box-Item-atras">
            <p>$${productos[2].precioProducto}</p>
        <button id="boton3">Agregar</button>
    </div>
</div>
</div>
<div class="box-Item">
    <div class="box-Item-interior">
        <div class="box-Item-frente">
            
            <p>${productos[3].nombreProducto}</p>
        </div>
        <div class="box-Item-atras">
            <p>$${productos[3].precioProducto}</p>
        <button id="boton4">Agregar</button>
    </div>
</div>
</div>
<div class="box-Item">
    <div class="box-Item-interior">
        <div class="box-Item-frente">
            
            <p>${productos[4].nombreProducto}</p>
        </div>
        <div class="box-Item-atras">
            <p>$${productos[4].precioProducto}</p>
        <button id="boton5">Agregar</button>
    </div>
</div>
</div>
<div class="box-Item">
    <div class="box-Item-interior">
        <div class="box-Item-frente">
            
            <p>${productos[5].nombreProducto}</p>
        </div>
        <div class="box-Item-atras">
            <p>$${productos[5].precioProducto}</p>
        <button id="boton6">Agregar</button>
    </div>
</div>
</div>
<div class="box-Item">
    <div class="box-Item-interior">
        <div class="box-Item-frente">
            
            <p>${productos[6].nombreProducto}</p>
        </div>
        <div class="box-Item-atras">
            <p>$${productos[6].precioProducto}</p>
        <button id="boton7">Agregar</button>
    </div>
</div>
</div>
`
//************************************************************************************************************* */
//*******************************Variables********************************* */

const productos = [];
productos.push(new Producto(1,"Mouse",50,20));
productos.push(new Producto(2,"Auricualares",250,10));
productos.push(new Producto(3,"Silla",400,2));
const carrito=[];

//****************************************************Funciones*************************************
async function Categorias(idcategoria){
    //Filtrar
    document.getElementById("box").innerHTML=("");
    const lista = document.querySelector('#box'); await fetch('./data.json')
    .then( (res) => res.json())
    .then( (data) => {
        data.forEach((producto) => {
            const li = document.createElement('li')
            if(producto.categoria==idcategoria){
                li.innerHTML = `
                <div class="box-Item">
                    <div class="box-Item-interior">
                        <div class="box-Item-frente">
                            <img class="icon-item"src="${producto.img}" alt="">
                            <p>${producto.nombre}</p>
                        </div>
                        <div class="box-Item-atras">
                            <p>${producto.precio}</p>
                        <button id="boton1">Agregar</button>
                    </div>
                </div>
                </div>`
            }
            lista.append(li)
        })
    })
}





function sumar(item) {
    item.restarStock();
    if (carrito.length==0||carrito.find(Compra=>Compra.nombreCompra==item.nombreProducto)==undefined){
        carrito.push(new Compra(item.nombreProducto,item.precioProducto,1))
        Toastify({
            text:"Producto Agregado",
            duration:3000,
            gravity:"top",
            position:"center",
        }).showToast();
        num_total=num_total+item.precioProducto;
    }
    else{
        num_total=num_total+item.precioProducto;
        for(const Compra of carrito){
            if(item.nombreProducto==Compra.nombreCompra&&item.stockProducto>=0){
                Compra.cantidadCompra=Compra.cantidadCompra++;
                Compra.precioCompra=Compra.precioCompra+Compra.precioCompra;  
                Toastify({
                    text:"Producto Agregado",
                    duration:3000,
                    gravity:"bottom",
                    position:"left",
                }).showToast();
                num_total=num_total+item.precioProducto;
            }
        }
    }

}
function total(){
    carrito.sort(function(a,b){return b.precioCompra-a.precioCompra});
    document.getElementById("total").innerHTML=("la suma total es de "+num_total);
    document.getElementById("items").innerHTML=("");
    var carro=document.getElementById("items");
    for(const Compra of carrito){
        var linea=document.createElement("li");
        var content=document.createTextNode(Compra.cantidadCompra +" "+Compra.nombreCompra+":"+Compra.precioCompra+"\n");
        localStorage.setItem("carrito", JSON.stringify(carrito));
        for (let i = 0; i < localStorage.length; i++) {
            let clave = localStorage.key(i);
            console.log("Clave: "+ clave);
            console.log("Valor: "+ localStorage.getItem(clave));
        }
        carro.appendChild(linea);
        linea.appendChild(content);
    }
    

}
function borrar(){
    Swal.fire({
        title: 'Desea borrar los datos',
        text: 'Una vez borrados no podra recuperarlos',
        icon: 'question',
        confirmButtonText: 'Cool'
      })
    num_total=0;
    document.getElementById("total").innerHTML=("");
    document.getElementById("items").innerHTML=("")
    localStorage.clear();
}
function enviar(){
    const nombreCliente = prompt('Ingrese su nombre');
    const direccionCliente = prompt('Ingrese la dirección de envio');
    const emailCliente = prompt('Ingrese su email para contactarlo');
    if(nombreCliente!=""&&direccionCliente!=""&&emailCliente!=""){
        const cliente = new Cliente(nombreCliente, direccionCliente,emailCliente);
        localStorage.setItem("cliente", JSON.stringify(cliente));
        Swal.fire({
            title: 'Enviado',
            text: 'El envio llegara de 3 a 5 dias habiles',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          cliente.mostrarDatos();
    }
    else{
        Swal.fire({
            title: 'Error',
            text: 'El formulario no es valido',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
}