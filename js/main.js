/* Crea una aplicación web para gestionar una lista de productos, donde el usuario pueda agregar productos a través de un formulario. Los productos se deben almacenar en Local Storage y mostrarse en una tabla en la página web. Si el usuario agrega un producto que ya existe, en lugar de duplicarlo, se debe incrementar un contador que indique cuántas veces se ha agregado el producto. Además, añade un botón "Eliminar" para cada producto que, al hacer clic, debe decrementar el contador de ese producto. Si el contador llega a cero, el producto debe eliminarse de la lista y del Local Storage.
Requisitos:

    Formulario de entrada de productos: Permitir al usuario ingresar productos a través de un campo de texto y un botón de "Agregar".
    Almacenamiento en Local Storage: Los productos se deben almacenar en Local Storage y deben persistir incluso si la página se recarga.
    Manejo de productos duplicados: Si el usuario agrega un producto que ya existe, en lugar de duplicarlo, se debe incrementar el contador de ese producto.
    Decremento del contador al eliminar productos: Si el usuario hace clic en "Eliminar" para un producto que se ha agregado varias veces, el contador debe decrementar. Si el contador llega a cero, el producto debe eliminarse completamente.
    Persistencia de la tabla: Al recargar la página, los productos deben cargarse desde el Local Storage.

Explicación del funcionamiento:

    Formulario de entrada de productos:
        El usuario puede ingresar productos a través del campo de texto. Al hacer clic en "Agregar Producto", se desencadena la función agregarProducto().

    Almacenamiento en Local Storage:
        Los productos ingresados se guardan en Local Storage. Cada producto tiene un nombre y un contador que indica cuántas veces ha sido agregado.
        Si un producto ya existe, su contador se incrementa en lugar de duplicarlo.

    Mostrar productos en la tabla:
        Los productos almacenados en Local Storage se muestran en una tabla. Cada fila contiene:
            El nombre del producto.
            Un contador que indica cuántas veces se ha agregado.
            Un botón "Eliminar" que permite decrementar el contador o eliminar completamente el producto si el contador llega a cero.

    Eliminar o decrementar productos:
        Si el producto se ha agregado más de una vez, al hacer clic en el botón "Eliminar", el contador disminuye.
        Si el contador llega a uno, el producto se elimina completamente de la lista. 
        __________________________________________________________________________________________________________
*/

//cogemos los elementos:
const formulario = document.querySelector("#formulario-producto");
const inputProducto = document.querySelector("#nombre-producto");
const tablaProductos = document.querySelector("#lista-productos");

//local storage (memoria).
//Vamos a cargar todo que este guardado. Caso esté vacio, empezaremos con una lista vacía.
let productos = JSON.parse(localStorage.getItem("producto")) || [];

//agrengando producto - estructura submit:
formulario.addEventListener("submit", function(event) { 
    event.preventDefault();//evitar que la página se cargue sola.
    const nombre = inputProducto.value.trim(); //capturar los valores que el usuario escriba.
    const productoExistent = productos.find(function(p) { //buscar duplicados.
        return p.nombre.toLowerCase() === nombre.toLowerCase(); 
    });

    //Validaciones:
    //si el usuario no escribe nada, detenemos el envio.
    if (nombre === "") {
        alert("Por favor, escribe el nombre de un producto.");
        return;
    }

    // si ya existe producto, aumentaremos el contador en 1.
    if (productoExistent) {
        productoExistent.cantidad++; 
    } else {
        productos.push({nombre: nombre, precio: "29,99", cantidad: 1});//caso sea producto nuevo, lo añadimos con la cantidad inicial 1.
    }

    localStorage.setItem("producto", JSON.stringify(productos));//Guardando la lista actualizada en local storage (memoria).  
    inputProducto.value = ""; //Limpiar: dejar el cuadro de texto vacío para el siguiente producto.   
    mostrarProductos();//Volvemos a dibujar la tabla para ver los cambios.
});

//Función para dibujar tabla:
function mostrarProductos() {
    tablaProductos.innerHTML = ""; // limpiar la tabla por dentro para no repetir filas viejas.
    productos.forEach(function (producto, indice) {
        const fila = document.createElement("tr"); // creamos la fila tr.
        
        const celdaNombre = document.createElement("td"); // creamos la celda del nombre <td>.
        celdaNombre.textContent = producto.nombre;

        const celdaPrecio = document.createElement("td");
        celdaPrecio.textContent = producto.precio + " €";

        const celdaCantidad = document.createElement("td");// creamos la celda cantidad <td>.
        celdaCantidad.textContent = producto.cantidad;

        const celdaAcciones = document.createElement("td");// creamos la celda acciones <td>.
        const botonEliminar = document.createElement("button");// creamos la celda eliminar <td>.
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "btn-Eliminar";

        botonEliminar.onclick = function () { // asignando función de eliminar al hacer click.
            eliminarProducto(indice);
        };
        celdaAcciones.appendChild(botonEliminar); // metemos el boton dentro de celda de acciones.
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaPrecio);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaAcciones);

        tablaProductos.appendChild(fila); //Para finalizar, metemos la fila completa dentro de la tabla real.
    });
}

//Activando el botón- Función eliminar o restar:
function eliminarProducto(indice) {
    productos[indice].cantidad--;

    if(productos[indice].cantidad === 0) {//borramos el producto si cantidad llega a cero:
        productos.splice(indice, 1);
    }
   
    localStorage.setItem("producto", JSON.stringify(productos)); //guardar los cambios en local storage y actualizar la tabla.
    mostrarProductos();
}

//Inicialización- buscamos en local storage uando clave unificada "producto".
productos = JSON.parse(localStorage.getItem("producto"));

//ponemos en marcha la lista de los productos (:

if (productos === null) { // caso no hay nada guardado, creamos la lista de ropa por defecto.

productos = [
    {nombre:"Camiseta negra", precio: "19.99", cantidad: 5},
    {nombre:"Pantalón Vaquero", precio: "39.99", cantidad: 2},
    {nombre:"Sudadera con Capucha", precio: "45.00", cantidad: 3},
];

localStorage.setItem("producto", JSON.stringify(productos));//guardamos la ropa por defecto en la memoria usando la clave unificada.
}

//una vez que la lista exista, pintamos la tabla.
mostrarProductos();





