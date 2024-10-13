class Nodo {
    constructor(caracter, siguiente = null) {
        this.caracter = caracter;
        this.siguiente = siguiente;
    }
}

class ListaEnlazada {
    constructor() {
        this.head = null;
    }

    // Agrega caracteres al final de la lista
    agregarCaracter(caracter) {
        const nuevoNodo = new Nodo(caracter);
        if (!this.head) {
            this.head = nuevoNodo;
        } else {
            let actual = this.head;
            while (actual.siguiente) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
    }

    // Invertir la lista enlazada
    invertirLista() {
        let anterior = null;
        let actual = this.head;
        let siguiente = null;
        while (actual !== null) {
            siguiente = actual.siguiente;
            actual.siguiente = anterior;
            anterior = actual;
            actual = siguiente;
        }
        this.head = anterior;
    }

    // Convertir la lista enlazada en una cadena de texto
    obtenerPalabra() {
        let palabraInvertida = '';
        let actual = this.head;
        while (actual !== null) {
            palabraInvertida += actual.caracter;
            actual = actual.siguiente;
        }
        return palabraInvertida;
    }
}

function invertirPalabra() {
    const palabra = document.getElementById('palabra').value.trim();
    if (palabra) {
        const lista = new ListaEnlazada();
        for (let i = 0; i < palabra.length; i++) {
            lista.agregarCaracter(palabra[i]);
        }

        // Invertir la lista enlazada
        lista.invertirLista();

        // Obtener la palabra invertida
        const palabraInvertida = lista.obtenerPalabra();
        document.getElementById('resultado').textContent = `Palabra invertida: ${palabraInvertida}`;
    } else {
        document.getElementById('resultado').textContent = 'Por favor, introduce una palabra.';
    }
}