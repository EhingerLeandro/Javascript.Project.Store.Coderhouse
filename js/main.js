//Declarando variables.
const contain_tienda =document.getElementById('contain_tienda');
const contain_carrito =document.getElementById('contain_carrito');
const contain_countries = document.getElementById('contain_countries')
const acumula_items = document.querySelector('.cantidad');
const carritoGlobal = document.getElementById('carritoGlobal');
let carrito=[];
let carritoElegido=[];
let carritoFiltrado =[];
let comingProducts=[];
let payed = false;
let total = 0;


let divTotal= document.createElement('div');
divTotal.classList.add('divTotal');
function renderTotal(){
    //Creando los Botones y Displays que se agregaran como parte del carrito.
    divTotal.innerHTML = `<div id='totalDiv'> Total $${total} </div>
    <button id='pay' class='payOrUndo'>Comprar Productos</button>
    <div id='llegada' style='background-color:#fbb8; color:#833; font-size:3vh'> Tu compra llegará dentro de 5 días </div>
    <button id='undoPayment' class='payOrUndo'>Cancelar Compra</button>`
}


//Función que dice la cantidad de items añadidos en el 'div' estático lateral del logo de carrito.
const acumulaCarrito = (array) => {
    let acumula = array.reduce( (acc, item) => acc + item.cantidad,0);
    acumula_items.innerHTML = `(${acumula})`;
    acumula_items.classList.add('fondo_cambia');
    setTimeout(()=> acumula_items.classList.remove('fondo_cambia') ,250)
}

//Función que borra un item del carrito.
const borrarItem =(item)=>{
    if(payed===false){
        let carritoNew = localStorage.getItem('carritoClave');
        let carritoBorrable =JSON.parse(carritoNew);
        carritoFiltrado = carritoBorrable.filter(obj => obj.id !== item.id);
        acumulaCarrito(carritoFiltrado);
        localStorage.setItem('carritoClave', JSON.stringify(carritoFiltrado));
        renderCarrito();
    }else if(payed===true){
        Toastify({
            text: "Oprime cancelar compra!",
            duration: 3000,
          }).showToast();
    }
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

    //Se pregunta si el valor sacado del localStorage es null, es decir si estaba vacio.
    if(carritoElegido !== null && carritoElegido.length !== 0){
        let counterFila = 0;
        total=0;
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
        renderTotal()
        buttonActivation(carritoElegido);

    //En caso de no haber ningún item, se renderiza en 0 el total.
    }else if (carritoElegido === null || carritoElegido.length === 0){
        total=0;
        renderTotal()
        buttonActivation(carritoElegido);
    }
    
    
}

//función que activa botones de compra, borrado y cancelado.
function buttonActivation (carChosen){

    contain_carrito.append(divTotal);

    let totalDiv = document.getElementById('totalDiv')
    let buttonPay = document.getElementById('pay');
    let llegada = document.getElementById('llegada'); 
    let buttonUndo = document.getElementById('undoPayment');

    if(payed === false){
        totalDiv.style.display="block";
        buttonPay.style.display="inline-block";
        llegada.style.display="none";
        buttonUndo.style.display="none";
    } else if(payed === true){
        totalDiv.style.display="none";
        buttonPay.style.display="none";
        llegada.style.display="block";
        buttonUndo.style.display="inline-block";

    }

    //Usando Tostify & SweetAlert Confirmando y cancelado la compra.
    buttonPay.addEventListener('click', ()=>{
        if(payed===false){
            if(carChosen.length !==0){
                Swal.fire({
                    title: "Compra Realizada!",
                    text: "El pago ha sido enviado!",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
                payed=true;
                localStorage.setItem('carritoClave', JSON.stringify([]));
                acumulaCarrito([]);
                renderCarrito();
                let buttonPay = document.getElementById('pay');
                buttonPay.removeEventListener('click', ()=>{});
            }else if(carChosen.length ==0){
                //Toastify Aplicado
                Toastify({
                    text: "No tienes ningún producto para comprar!",
                    duration: 3000,
                }).showToast();
            }

        }

    })

    buttonUndo.addEventListener('click', ()=>{
        if(payed===true){
            //SweetAlert aplicado
            Swal.fire({
                title: "Está seguro de que quieres cancelar la compra?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, seguro",
                cancelButtonText: "No",
            }).then((result) => {
                if (result.isConfirmed) {
                //SweetAlert aplicado
                Swal.fire({
                    title: "Compra Cancelada!",
                    icon: "success",
                    text: "El pago ha sido devuelto",
                });
                payed=false;
                localStorage.setItem('carritoClave', JSON.stringify([]));
                acumulaCarrito([]);
                renderCarrito();
                buttonUndo.removeEventListener('click', ()=>{})
                }
            });
        }
    })
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
        botonAgregar.addEventListener('click', 
            ()=>{
                if (payed ===false){
                    agregarCarrito(item)
                }
            })
        
    })
}
generarTienda();
renderCarrito();