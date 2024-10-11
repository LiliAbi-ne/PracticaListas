class Producto {
    constructor(id, name, precio) {
        this.id = id;
        this.name = name;
        this.precio = precio;
    }
}

class ListaProductos {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(product => product.id !== id);
    }

    obtenerProductos() {
        return this.productos;
    }

    calcularTotal() {
        return this.productos.reduce((total, prod) => total + prod.precio, 0);
    }
}

// Instancia de la lista de productos
const listaProductos = new ListaProductos();
let idCounter = 1;

// Agregar producto a la lista
function agregarProducto() {
    const nombre = document.getElementById('nombreProducto').value;
    const precio = parseFloat(document.getElementById('precioProducto').value);

    if (nombre && precio) {
        const producto = new Producto(idCounter++, nombre, precio);
        listaProductos.agregarProducto(producto);
        mostrarProductos();
        document.getElementById('nombreProducto').value = '';
        document.getElementById('precioProducto').value = '';
    }
}

// Mostrar productos en el HTML
function mostrarProductos() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    listaProductos.obtenerProductos().forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h2>${producto.name} - $${producto.precio}</h2>
            <p>ID: ${producto.id}</p>
        `;
        productList.appendChild(productCard);
    });

    // Mostrar el costo total de compra
    document.getElementById('total-compra').textContent = `Costo Total de Compra: $${listaProductos.calcularTotal()}`;
}

// Eliminar producto por ID
function eliminarProducto() {
    const id = parseInt(document.getElementById('idProductoEliminar').value);
    listaProductos.eliminarProducto(id);
    mostrarProductos();
    document.getElementById('idProductoEliminar').value = '';
}
