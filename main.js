let confirmaBusqueda;
let productoBuscado;
let listaFiltrada=[];
let listaFiltradaVisual='';
let listaVisualTotal='';
let eligeProducto;
let carrito=[];
let ultimoProducto;
let productoCantidad;
let productosParciales="";
let subtotal=0;
let total = 0;
let descontado=0;
let confirma = true;

//Aplicando el arreglo con objetos.
let listaProductos=[ 
    {id:1, nombre:"Pantalon Gris", precio:90}, 
    {id:2, nombre:"Pantalon Beige", precio:95}, 
    {id:3, nombre:"Jean Azul", precio:125}, 
    {id:4, nombre:"Jean Azul Oscuro", precio:135}, 
    {id:5, nombre:"Gorra logo Beisbol", precio:35}, 
    {id:6, nombre:"Gorra logo NBA", precio:38}, 
    {id:7, nombre:"Camisa Blanca", precio:50}, 
    {id:8, nombre:"Camisa Gris Oscura", precio:45}, 
    {id:9, nombre:"Camiseta logo Army", precio:55},  
    {id:10, nombre:"Camiseta logo Navy", precio:50},
    {id:11, nombre:"Zapatos Negros", precio:120}, 
    {id:12, nombre:"Zapatos Blancos", precio:125}, 
    {id:13, nombre:"Tenis Nike", precio:155}, 
    {id:14, nombre:"Tenis Puma", precio:150}, 
    {id:15, nombre:"Sandalias negras", precio:35}, 
    {id:16, nombre:"Sandalias blancas", precio:40}, 
    {id:17, nombre:"Chaqueta deportiva", precio:110}, 
    {id:18, nombre:"Chaqueta ranger", precio:105}, 
    {id:19, nombre:"Pantaloneta playa", precio:40},
    {id:20, nombre:"Pantaloneta sport", precio:45}
];

alert('Bienvenido a tu Tienda de Ropa Only-Actitud');

/* Función creada para filtrar los productos que tengan un nombre similar al buscado por el usuario,
para que así aparezcan en el texto del prompt. */
const filtrarLista =()=>{
    productoBuscado = prompt('Escribe el NOMBRE del producto que buscas.');
    if(productoBuscado === null){
        alert('Oprimiste cancelar, iniciaremos de nuevo.')
        eleccion();
    }else{
        listaFiltrada = listaProductos.filter(item => (item.nombre.toLowerCase()).includes(productoBuscado.toLowerCase()));
        if(listaFiltrada.length > 0 && productoBuscado !==''){
            for(let i = 0; i < listaFiltrada.length; i++){
                listaFiltradaVisual += ` (${listaFiltrada[i].id}-${listaFiltrada[i].nombre}) `
            }
            eligeProducto = parseInt(prompt(`Los productos encontrados son: ${listaFiltradaVisual}; Elige el número del producto que quieres comprar. `));
            listaFiltradaVisual='';
        }else{
            alert('No se encontró ningún producto con esa descripción, intentalo de nuevo.')
            filtrarLista();
        }
    }
}

//Función que muestra toda la lista de productos disponible en el texto de un prompt.
const eligeListaCompleta =()=>{
    for(j=0; j<listaProductos.length; j++){
            listaVisualTotal += ` (${listaProductos[j].id}-${listaProductos[j].nombre}) `;
        }
        eligeProducto = parseInt(prompt(`[ Elige el NÚMERO del PRODUCTO que quieres comprar de la LISTA ] : ${listaVisualTotal}. `));
        listaVisualTotal='';
}

//Funcion creada para preguntar si se quiere buscar por el nombre, o si se quiere ver toda la lista.
const buscar_o_listaCompleta =()=>{
    confirmaBusqueda = confirm('ACEPTAR = BUSCAR producto por nombre // CANCELAR = ver lista completa.');
    if(confirmaBusqueda){
        filtrarLista()
    }else{
        eligeListaCompleta();
    }
}

// ---->> FUNCIÓN PRINCIPAL <<---- Contiene en su interior todas las demás funciones.
const eleccion =() =>{
    while(confirma === true){

        buscar_o_listaCompleta();

        if( isNaN(eligeProducto) || eligeProducto >20  || eligeProducto <1 ){
            alert('No digitaste ningún número de la lista. ¡Inténtalo de nuevo!')
            eleccion();
        }else{
        //Agregando el producto elegido (objeto) al carrito.
            carrito.push(listaProductos[eligeProducto-1]);
            ultimoProducto = carrito[carrito.length-1];
            alert(`Elegiste el producto '${ultimoProducto.nombre}', el cual vale $${ultimoProducto.precio}`)
            }

        //La siguiente función flecha solicita el número de unidades que se quieren del producto.
        const queCantidad =()=>{
            productoCantidad = parseInt(prompt(`¿Qué cantidad de '${ultimoProducto.nombre}' necesitas llevar? // Nota: Por cada producto adicional recibes un DESCUENTO de $1 por item.`));
        
            if( isNaN(productoCantidad)){
                alert('No digitaste una cantidad válida, inténtalo de nuevo.');
                queCantidad();
            }else{
                //Sumatoria de la cantidad solicitada del producto junto con descuento marginal.
                for(let i=1; i<=productoCantidad; i++){
                    subtotal += (ultimoProducto['precio'] - descontado);
                    descontado += 1;
                }
                total += subtotal;
                productosParciales += `${productoCantidad} unidades de '${ultimoProducto['nombre']}' vale $${subtotal}. // `
                alert(`${productosParciales} ( TOTAL ACUMULADO = $${total} )`)
                subtotal=0;
                descontado=0;
            }
        }
        queCantidad();
        confirma = confirm('Quieres agregar otro producto al carrito?');
    }
    alert('Gracias por la compra.')
}

eleccion();

