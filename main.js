let eligeProducto;
let precioSelect;
let productoEstilo;
let productoCantidad;
let productosParciales="";
let subtotal=0;
let total = 0;
let descontado=0;
let confirma = true;

alert('Bienvenido a tu Tienda de Ropa Only-Actitud');

const eleccion =() =>{

    while(confirma === true){

        eligeProducto = parseInt(prompt('Elige el número del producto que quieres comprar:   (1-Gorra Gris)   (2-Gorra Negra)   (3-Gorra Azul)   (4-Gorra logo Beisbol)   (5-Gorra logo NBA)   (6-Camiseta Blanca)   (7-Camiseta Gris Oscura)   (8-Camiseta logo Army)   (9-Camiseta logo Navy)   (10-Camiseta logo Tropical)'));

        if( isNaN(eligeProducto) || eligeProducto >10  || eligeProducto <1 ){

            alert('No digitaste ningún número de la lista. ¡Inténtalo de nuevo!')
            eleccion();

        }else{

            switch(eligeProducto){
                case 1:
                    precioSelect = 20;
                    productoEstilo ="Gorra Gris"
                    break;
                case 2:
                    precioSelect = 30;
                    productoEstilo ="Gorra Negra"
                    break;
                case 3:
                    precioSelect = 25;
                    productoEstilo ="Gorra Azul"
                    break;
                case 4:
                    precioSelect = 35;
                    productoEstilo ="Gorra logo Beisbol"
                    break;
                case 5:
                    precioSelect = 35;
                    productoEstilo ="Gorra logo NBA"
                    break;
                case 6:
                    precioSelect = 40;
                    productoEstilo ="Camiseta Blanca"
                    break;
                case 7:
                    precioSelect = 50;
                    productoEstilo ="Camiseta Gris Oscura"
                    break;
                case 8:
                    precioSelect = 55;
                    productoEstilo ="Camiseta logo Army"
                    break;
                case 9:
                    precioSelect = 55;
                    productoEstilo ="Camiseta logo Navy"
                    break;
                case 10:
                    precioSelect = 50;
                    productoEstilo ="Camiseta logo Tropical"
                    break;
            } 
            
            alert(`Elegiste '${productoEstilo}' la cual vale $${precioSelect} cada unidad`);
        }
        const queCantidad =()=>{

            productoCantidad = parseInt(prompt(`¿Qué cantidad de '${productoEstilo}' necesitas llevar? // Nota: Por cada producto adicional recibes un DESCUENTO de $1 por item.`));
        
            if( isNaN(productoCantidad)){
                alert('No digitaste una cantidad válida, inténtalo de nuevo.');
                queCantidad();

            }else{
                
                for(let i=1; i<=productoCantidad; i++){
                    subtotal += (precioSelect - descontado);
                    descontado += 1;
                }

                total += subtotal;
                productosParciales += `${productoCantidad} unidades de '${productoEstilo}' vale $${subtotal}. // `
                
                alert(`${productosParciales} ( TOTAL ACUMULADO = $${total} )`)

                subtotal=0;
                descontado=0;

                confirma = confirm('Quieres agregar otro producto al carrito?');
            }
        }
        queCantidad();
    }
    alert('Gracias por la compra.')
}

eleccion();

