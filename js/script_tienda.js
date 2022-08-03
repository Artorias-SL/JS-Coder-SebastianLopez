let num_total=0;
document.getElementById("boton1").onclick = function() {sumar(productos[0])};
document.getElementById("boton2").onclick = function() {sumar(productos[1])};
document.getElementById("boton3").onclick = function() {sumar(productos[2])};
document.getElementById("boton4").onclick = function() {sumar(productos[3])};
document.getElementById("boton5").onclick = function() {sumar(productos[4])};
document.getElementById("boton6").onclick = function() {sumar(productos[5])};
document.getElementById("boton7").onclick = function() {sumar(productos[6])};
document.getElementById("resultado").onclick = function() {total()};
document.getElementById("borrar").onclick=function(){borrar()};
document.getElementById("enviar").onclick=function(){enviar()};
document.getElementById("filtrar1").onclick=function(){Categorias(1)};
document.getElementById("filtrar2").onclick=function(){Categorias(2)};
document.getElementById("filtrar3").onclick=function(){Categorias(3)};

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
class Producto{
    constructor(id_categoria,id,nombre,precio,stock,img){
        //Propiedades
        this.idCategoria=id_categoria;
        this.idProducto=id;
        this.nombreProducto=nombre;
        this.precioProducto=precio;
        this.stockProducto=stock;
        this.imgProducto=img;
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
class Compra{
    constructor(nombre,precio,cantidad){
        //Propiedades
        this.nombreCompra=nombre;
        this.precioCompra=precio;
        this.cantidadCompra=cantidad;
    }
}
//*******************************Variables********************************* */

const productos = [];
productos.push(new Producto(1,1,"Mouse",3500,20,"./components/NMG-1680_600 (1).jpg"));
productos.push(new Producto(1,2,"Auricualares",5550,10,"./components/NSG-1656_600 (1).jpg"));
productos.push(new Producto(3,3,"Silla",35000,5,"./components/NFG-0893_600 (1).jpg"));
productos.push(new Producto(2,4,"Gabinete",10000,15,"./components/EN46829_600.jpg"));
productos.push(new Producto(2,5,"Procesador AMD",48000,25,"./components/Ryzen_9_3900x.jpg"));
productos.push(new Producto(2,6,"Memoria RAM",8000,50,"./components/AX4U30008G16A-SB10_800.jpg"));
productos.push(new Producto(1,7,"Monitor",25000,20,"./components/22MK600M_600.jpg"));
const carrito=[];

//***********/

//

//****************************************************Funciones*************************************

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
function Categorias(idcategoria){
    document.getElementById("box-list").innerHTML=("");
    var elm=document.getElementById("box-list")
    for  (const Producto of productos){
        const item=document.createElement("li");
        if (Producto.idCategoria==idcategoria){
            console.log("hola");
            item.innerHTML = `
                <div class="box-Item">
                    <div class="box-Item-interior">
                        <div class="box-Item-frente">
                            <img class="icon-item"src="${Producto.imgProducto}" alt="">
                            <p>${Producto.nombreProducto}</p>
                        </div>
                        <div class="box-Item-atras">
                            <p>${Producto.precioProducto}</p>
                            <button id="boton${Producto.idProducto}">Agregar</button>
                        </div>
                    </div>
                </div>`
            elm.appendChild(item)
            var btn=document.getElementById("boton"+Producto.idProducto)
            btn.setAttribute("id","boton"+Producto.idProducto)
        }
    }

}

