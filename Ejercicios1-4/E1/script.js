
class Producto {
    constructor(id, name, precio, stock) {
        this.id = id;
        this.name = name;
        this.precio = precio;
        this.stock = stock;
        this.next = null;
    }
}

class List {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(producto) {
        if (!this.head) {
            this.head = producto;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = producto;
        }
        this.size++;
    }

    removeById(id) {
        if (!this.head) return;


        if (this.head.id === id) {
            this.head = this.head.next;
            this.size--;
            return;
        }

        let current = this.head;
        let previous = null;


        while (current && current.id !== id) {
            previous = current;
            current = current.next;
        }


        if (current) {
            previous.next = current.next;
            this.size--;
        }
    }

    removeAll() {
        this.head = null;
        this.size = 0;
    }

    getAllProducts() {
        let current = this.head;
        const products = [];
        while (current) {
            products.push(current);
            current = current.next;
        }
        return products;
    }
}

function getRandomPrice(max) {
    return Math.floor(Math.random() * max) + 1;
}

function getRandomStock(max) {
    return Math.floor(Math.random() * max) + 1;
}


const lista = new List();

let idCounter = 1;

for (let i = 1; i <= 3; i++) {
    const randomProduct = new Producto(idCounter++, `Producto-${i}`, getRandomPrice(100), getRandomStock(50));
    lista.add(randomProduct);
}

function displayProducts() {
    const productListElement = document.getElementById('product-list');
    productListElement.innerHTML = ""; // Limpiar el contenido anterior
    const products = lista.getAllProducts();

    products.forEach(product => {

        const productElement = document.createElement('div');
        productElement.className = 'product';

        productElement.innerHTML = `
            <div>
                <h2>${product.name}</h2>
                <p>Precio: $${product.precio}</p>
                <p>Stock: ${product.stock} unidades</p>
            </div>
            <div class="buttons">
                <button onclick="removeProduct(${product.id})">Eliminar</button>
            </div>
        `;


        productListElement.appendChild(productElement);
    });
}


displayProducts();


function addProduct() {
    const newProduct = new Producto(idCounter++, `Producto-${idCounter}`, getRandomPrice(100), getRandomStock(50));
    lista.add(newProduct);
    displayProducts();
}


function removeProduct(id) {
    lista.removeById(id);
    displayProducts();
}


function removeAllProducts() {
    lista.removeAll();
    displayProducts();
}


document.getElementById('add-product').addEventListener('click', addProduct);
document.getElementById('remove-all').addEventListener('click', removeAllProducts);
