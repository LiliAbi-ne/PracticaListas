// Nodo para almacenar una palabra en una lista enlazada
class NodoPalabra {
    constructor(palabra, siguiente = null) {
        this.palabra = palabra;  // Palabra que se almacena
        this.siguiente = siguiente;  // Referencia al siguiente nodo
    }
}

// Nodo para almacenar una lista de palabras que comienzan con la misma letra
class NodoLetra {
    constructor(letra, siguiente = null) {
        this.letra = letra;
        this.siguiente = siguiente;
        this.listaPalabras = null;
    }

    // Agregar una palabra a la lista de palabras en orden alfabético
    agregarPalabraOrdenada(palabra) {
        const nuevoNodo = new NodoPalabra(palabra);

        // Si la lista está vacía o la primera palabra es mayor que la nueva palabra
        if (this.listaPalabras === null || this.listaPalabras.palabra.localeCompare(palabra) > 0) {
            nuevoNodo.siguiente = this.listaPalabras;
            this.listaPalabras = nuevoNodo;
        } else {
            let actual = this.listaPalabras;
            // Buscar la posición correcta para insertar la nueva palabra
            while (actual.siguiente !== null && actual.siguiente.palabra.localeCompare(palabra) < 0) {
                actual = actual.siguiente;
            }
            nuevoNodo.siguiente = actual.siguiente;
            actual.siguiente = nuevoNodo;
        }
    }

    // Recorrer todas las palabras en la lista y ejecutar un callback
    recorrerPalabras(callback) {
        let actual = this.listaPalabras;
        while (actual !== null) {
            callback(actual.palabra);
            actual = actual.siguiente;
        }
    }
}

// Lista principal que contiene nodos de letra
class ListaLetras {
    constructor() {
        this.head = null;
    }

    // Agregar una palabra a la lista, creando un nodo de letra si no existe
    agregarPalabra(palabra) {
        const letra = palabra[0].toUpperCase();
        let nodoLetra = this.buscarLetra(letra);

        // Si no existe un nodo con la letra, creamos uno nuevo
        if (!nodoLetra) {
            nodoLetra = new NodoLetra(letra);
            this.agregarNodoLetra(nodoLetra);
        }

        // Agregar la palabra al nodo correspondiente por letra de forma ordenada
        nodoLetra.agregarPalabraOrdenada(palabra);
    }

    // Buscar un nodo por letra
    buscarLetra(letra) {
        let actual = this.head;
        while (actual !== null) {
            if (actual.letra === letra) {
                return actual;
            }
            actual = actual.siguiente;
        }
        return null;
    }


    agregarNodoLetra(nodoLetra) {
        if (this.head === null) {
            this.head = nodoLetra;
        } else {
            let actual = this.head;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nodoLetra;
        }
    }


    recorrerLetras(callback) {
        let actual = this.head;
        while (actual !== null) {
            callback(actual);
            actual = actual.siguiente;
        }
    }
}


const listaLetras = new ListaLetras();

function agregarPalabra() {
    const palabra = document.getElementById('palabra').value.trim();
    if (palabra) {
        listaLetras.agregarPalabra(palabra);
        mostrarListasPorLetra();
        document.getElementById('palabra').value = '';
    }
}

function mostrarListasPorLetra() {
    const listasDiv = document.getElementById('listas-por-letra');
    listasDiv.innerHTML = '';  // Limpiar el contenido actual

    listaLetras.recorrerLetras(nodoLetra => {
        const letraDiv = document.createElement('div');
        letraDiv.classList.add('letra-lista');
        letraDiv.innerHTML = `<h3>Lista de palabras que comienzan con '${nodoLetra.letra}'</h3>`;

        const palabrasDiv = document.createElement('div');
        palabrasDiv.classList.add('palabras-lista');
        nodoLetra.recorrerPalabras(palabra => {
            const palabraDiv = document.createElement('span');
            palabraDiv.textContent = palabra;
            palabrasDiv.appendChild(palabraDiv);
        });

        letraDiv.appendChild(palabrasDiv);
        listasDiv.appendChild(letraDiv);
    });
}


document.getElementById('agregar-btn').addEventListener('click', agregarPalabra);
