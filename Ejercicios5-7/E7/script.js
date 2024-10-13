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

    obtenerPalabra() {
        let palabra = '';
        let actual = this.head;
        while (actual !== null) {
            palabra += actual.caracter;
            actual = actual.siguiente;
        }
        return palabra;
    }

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
}

function limpiarTexto(texto) {
    return texto.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function verificarPalindromo() {
    const fraseOriginal = document.getElementById('palabra').value.trim();
    const palabraLimpia = limpiarTexto(fraseOriginal);

    if (palabraLimpia) {
        const listaOriginal = new ListaEnlazada();
        const listaInvertida = new ListaEnlazada();

        for (let i = 0; i < palabraLimpia.length; i++) {
            listaOriginal.agregarCaracter(palabraLimpia[i]);
            listaInvertida.agregarCaracter(palabraLimpia[i]);
        }

        listaInvertida.invertirLista();

        const palabraOriginal = listaOriginal.obtenerPalabra();
        const palabraInvertida = listaInvertida.obtenerPalabra();

        if (palabraOriginal === palabraInvertida) {
            document.getElementById('resultado').textContent = `"${fraseOriginal}" es un palíndromo.`;
        } else {
            document.getElementById('resultado').textContent = `"${fraseOriginal}" no es un palíndromo.`;
        }
    } else {
        document.getElementById('resultado').textContent = 'Por favor, introduce una palabra o frase válida.';
    }
}
