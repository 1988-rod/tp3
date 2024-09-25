// script.js

// Precios de los platos y salsas
const precios = {
    platos: {
        Canelones: 4500,
        Sorrentinos: 4400,
        Ravioles: 4000,
        Ñoquis: 3800,
        Tallarines: 3500
    },
    salsas: {
        Tuco: 2000,
        Crema: 3000,
        Mixta: 2700
    }
};

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoList = document.getElementById('carrito');
    carritoList.innerHTML = ''; // Limpiar el carrito existente

    let totalPrecio = 0; // Inicializar el total

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.plato} - ${item.salsa}: $${item.precio}`;
        carritoList.appendChild(li);
        totalPrecio += item.precio; // Sumar el precio al total
    });

    // Mostrar el precio total en la web
    document.getElementById('total').textContent = `Total: $${totalPrecio}`;
}

// Manejar el evento de envío del formulario
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const plato = document.getElementById('plato').value;
    const salsa = document.getElementById('salsa').value;

    // Verificar si el plato y salsa son válidos
    if (!precios.platos[plato] || !precios.salsas[salsa]) {
        alert("Por favor, selecciona un plato y salsa válidos.");
        return;
    }

    // Crear un objeto para el nuevo pedido
    const nuevoPedido = {
        plato: plato,
        salsa: salsa,
        precio: precios.platos[plato] + precios.salsas[salsa] // Sumar los precios
    };

    // Obtener el carrito actual y agregar el nuevo pedido
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(nuevoPedido);

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Limpiar el formulario
    document.getElementById('form').reset();

    // Actualizar la vista del carrito
    cargarCarrito();
});

// Cargar el carrito al iniciar la página
cargarCarrito();
