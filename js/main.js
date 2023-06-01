//Declarando variables.
const contain_tienda =document.getElementById('contain_tienda');
const contain_carrito =document.getElementById('contain_carrito');
const acumula_items = document.querySelector('.cantidad');
const carritoGlobal = document.getElementById('carritoGlobal');
let carrito=[];
let carritoElegido=[];
let carritoFiltrado =[];
let divTotal='';

//Función que dice la cantidad de items añadidos en el 'div' estático con logo de carrito.
const acumulaCarrito = (array) => {
    let acumula = array.reduce( (acc, item) => acc + item.cantidad,0);
    acumula_items.innerHTML = `(${acumula})`;
    acumula_items.classList.add('fondo_cambia');
    setTimeout(()=> acumula_items.classList.remove('fondo_cambia') ,250)
}

//Función que borra un item del carrito.
const borrarItem =(item)=>{
    let carritoNew = localStorage.getItem('carritoClave');
    let carritoBorrable =JSON.parse(carritoNew);
    carritoFiltrado = carritoBorrable.filter(obj => obj.id !== item.id);
    acumulaCarrito(carritoFiltrado);
    localStorage.setItem('carritoClave', JSON.stringify(carritoFiltrado));
    renderCarrito();
}

//Función que genera renderizado del carrito.
function renderCarrito (){
    let carritox = localStorage.getItem('carritoClave');
    carritoElegido = JSON.parse(carritox);
    // Este es el encabezado de la tabla en el render.
    contain_carrito.innerHTML = `  
    <div id="carrito_header" class="grid_container">
        <div class="grid-item header-item">Picture</div>
        <div class="grid-item header-item">Nombre</div>
        <div class="grid-item header-item">Cantidad</div>
        <div class="grid-item header-item">Precio</div>
        <div class="grid-item header-item">Subtotal</div>
        <div class="grid-item header-item">Eliminar</div>
    </div>`;
    let total = 0;
    //Se pregunta si el valor sacado del localStorage es null, es decir si estaba vacio.
    if(carritoElegido !== null){
        let counterFila = 0;
        //Este forEach renderiza cada renglon-fila con los productos agregados al carrito.
        carritoElegido.forEach(elem =>{
            fila= document.createElement('div');
            fila.innerHTML=`
                <div class='grid-item'>
                    <div class ='fila_imagen'>
                        <img class='icon_imagen' src='./images/image_${elem.id}.jpg'>
                    </div>
                </div>
                <div class='grid-item grid-texto'>${elem.nombre}</div>
                <div class='grid-item grid-texto'>${elem.cantidad}</div>
                <div class='grid-item grid-texto'>${elem.precio}</div>
                <div class='grid-item grid-texto'>${elem.cantidad * elem.precio}</div>
                <div class='grid-item'>
                    <div class='fila_borra'>
                        <img id='borra-${elem.id}' class='icon_borra' src='./images/icon_borra.png'>
                    </div>
                </div> `; 
                
            counterFila += 1;
            fila.classList.add('grid_container')
            fila.classList.add('filas')
            //El '%' Se usa para intercalar las clases de las filas y darles backgrounds diferentes.
            fila.classList.add(`fila${counterFila%2 == 0}`);
            contain_carrito.append(fila);
            //Se va realizando la sumatoria total, conforme se agregan productos.
            total += elem.cantidad * elem.precio;
            
            //Se llama la función con la cual se borra un item.
            let botonBorrar = document.getElementById(`borra-${elem.id}`);
            botonBorrar.addEventListener('click', ()=>borrarItem(elem));

            //Se llama la función que muestra la cantidad de todos los items añadidos.
            acumulaCarrito(carritoElegido);

        })
        //Se añade el valor total del carrito al render.
        divTotal= document.createElement('div');
        divTotal.classList.add('divTotal')
        divTotal.innerHTML = `<div> Total $${total} </div>`;
        contain_carrito.append(divTotal);
    }
}

//Función que agrega productos aun carrito en el localStorage.
const agregarCarrito = (product) => {
    let carritoStorage = localStorage.getItem('carritoClave');
    //Si en el localStorage no hay 'carritoClave' se aplica setItem al primer valor oprimido.
    if(carritoStorage === null){
        localStorage.setItem('carritoClave', `[${JSON.stringify(product)}]`);
    }else{
        carrito= JSON.parse(carritoStorage);
        let filtrado = carrito.filter((element) => element.id === product.id );
        //En este 'if' cuando el arreglo 'filtrado' es mayor a cero significa que un objeto se repite.
        if(filtrado.length > 0){
            //Se recorre el arreglo 'carrito' para sumar 1 a la cantidad del objeto repetido.
            carrito.forEach(obj =>{
                if(obj.id === product.id){
                    obj['cantidad'] += 1
                }
            })
        //Si no es mayor a 0, significa que no hay objetos repetidos, y se hace push a un nuevo objeto.
        }else{
            carrito.push(product);
        }
        //Muestra la cantidad de todos los items añadidos.
        acumulaCarrito(carrito);
        localStorage.setItem('carritoClave', `${JSON.stringify(carrito)}`);
    }
    //Se llama la función para que renderice el carrito.
    renderCarrito();
  
}

//Función que muestra toda la lista de productos como cards en la página.
const generarTienda =()=>{
    listaProductos.forEach( item=>{
        let card=document.createElement('div');
        card.innerHTML= `
        <h2>${item.nombre}</h2>
        <span>Precio: $${item.precio}</span>
        <div class='card_image'>
            <img class='pic' src='./images/image_${item.id}.jpg'>
        </div>
        <button class='addButton' id='add${item.id}'>Agregar</button>`;
        card.classList.add(`cards`);
        card.classList.add(`card-${item.id}`);
        contain_tienda.append(card);
        
        //Aquí se aplica la función 'agregarCarrito' escrita previamente.
        let botonAgregar = document.getElementById(`add${item.id}`);
        botonAgregar.addEventListener('click', ()=>agregarCarrito(item))
    })
}
generarTienda();
renderCarrito();






