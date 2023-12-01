// se realiza uan constante donde almacenará la cantidad de cada producto en el carrito.
const cantidadProducto = {};

// se realiza una función para incrementar la cantidad de un producto en el carrito. 
function incremento(idLibro) {
  // Verifica si el producto ya está en el carrito. Si no, inicializa la cantidad a 0.
    if (!cantidadProducto[idLibro]) {
        cantidadProducto[idLibro] = 0;
    }
    // Incrementa la cantidad del producto en el carrito.
    cantidadProducto[idLibro]++;
    // Llama a la función para actualizar la cantidad en la interfaz.
    actualizarCantidad(idLibro);
}
// se realiza una función para decrementar la cantidad de un producto en el carrito.
function decremento(idLibro) {
   // Verifica si el producto está en el carrito y tiene una cantidad mayor que 0
    if (cantidadProducto[idLibro] && cantidadProducto[idLibro] > 0) {
      // Decrementa la cantidad del producto en el carrito.
        cantidadProducto[idLibro]--;
        actualizarCantidad(idLibro);
    }
}
// se realiza una función para actualizar la cantidad de un producto en la interfaz.
function actualizarCantidad(idLibro) {
    // muestra la cantidad del producto
    const productoCantidad = document.getElementById(`count${idLibro}`);
    // muestra el subtotal del producto
    const subtotalElement = document.getElementById(`subtotal${idLibro}`);
     //se obtiene el elemento del producto en el carrito usando el atributo de datos (data-id)
    const productoLibro = document.querySelector(`.book[data-id="${idLibro}"]`);
//  aca se verificar si todos los elementos necesarios existen
    if (productoCantidad && subtotalElement && productoLibro) {
         // se cre una contante para obtener la cantidad actual del producto desde un objeto llamado cantidadProducto
        const cantidad = cantidadProducto[idLibro];
        // se obtiene el precio del libro desde el atributo de datos (data-price) y convertirlo a un número decimal
        const precioLibro = parseFloat(productoLibro.dataset.price);
        // Calcular el subtotal multiplicando la cantidad por el precio del libro
        const subtotal = cantidad * precioLibro;

        // Actualiza el contenido del elemento que muestra la cantidad del producto
        productoCantidad.textContent = cantidad;
        // se actualizar el contenido del elemento que muestra el subtotal con formato de moneda
        subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(3)}`;

        // Llama a la función para actualizar el carrito
        mostrarCarrito();
    }
 
}
// se realiza una función para mostrar el contenido del carrito en la interfaz.
function mostrarCarrito() {
    const carrito = document.getElementById("cart");
    // Inicializa el contenido del carrito con un encabezado.
    carrito.innerHTML = "los libros agregados al carrito son";
 // Inicializa la variable que almacenará el precio total del carrito.
    let precioTotal = 0;

    for (const idLibro in cantidadProducto) {
       // Obtiene la cantidad del producto y sus datos (nombre y precio) desde el HTML.
        const cantidad = cantidadProducto[idLibro];
        const productoLibro = document.querySelector(`.book[data-id="${idLibro}"]`);
        const nombreLibro = productoLibro ? productoLibro.dataset.name : "Libro Desconocido";
        const precioLibro = productoLibro ? parseFloat(productoLibro.dataset.price) : 0;
// Calcula el subtotal del producto (cantidad * precio) y actualiza el precio total del carrito.
        const subtotal = cantidad * precioLibro;
        precioTotal += subtotal;
// Agrega una línea al carrito con el nombre del producto, cantidad y subtotal
        carrito.innerHTML += `<p>${nombreLibro} x ${cantidad} = $${subtotal.toFixed(3)}</p>`;
    }
// Agrega al carrito una línea con el precio total.
    carrito.innerHTML += `<p>Total: $${precioTotal.toFixed(3)}</p>`;
}

