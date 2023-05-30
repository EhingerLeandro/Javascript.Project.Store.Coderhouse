//Declarando variables.
const contain_tienda =document.getElementById('contain_tienda');
const contain_carrito =document.getElementById('contain_carrito');
const acumula_items = document.querySelector('.cantidad');
let carrito=[];
let carritoElegido=[];
let carritoFiltrado =[];

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
    contain_carrito.innerHTML='';
    let total = 0;
    //Se pregunta si el valor sacado del localStorage es null, es decir si estaba vacio.
    if(carritoElegido !== null){
        let counterFila = 0;
        let color ='#0ff';
        //Este forEach renderiza cada renglon-fila con los productos agregados al carrito.
        carritoElegido.forEach(elem =>{
            let fila= document.createElement('div');
            fila.innerHTML=`
                <div class='fila_datos'>
                    <b style='color:${color}'>Nombre: </b>${elem.nombre}  <b style='color:${color}'> Cant: </b> ${elem.cantidad}  <b style='color:${color}'>x Precio: </b> $${elem.precio} <b style='color:${color}'> = </b> $${elem.cantidad * elem.precio}   
                </div>
                <div class='fila_borra'>
                    <button class='boton_borra' id='borra-${elem.id}'>Borrar</button>
                </div> `; /*<img class='icon_borra' src='./images/icon_borra.png'>*/
                
            counterFila += 1;
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
        divTotal.innerHTML = `<div> Total = $${total} </div>`;
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






