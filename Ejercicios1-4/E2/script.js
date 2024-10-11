// Definir la clase para manejar la lista de números
class Numero {
    constructor(valor) {
        this.valor = valor;
    }

    esPar() {
        return this.valor % 2 === 0;
    }
}

class ListaNumeros {
    constructor() {
        this.numeros = [];
    }

    agregarNumero(valor) {
        const numero = new Numero(valor);
        this.numeros.push(numero);
    }

    obtenerPares() {
        return this.numeros.filter(numero => numero.esPar()).map(num => num.valor);
    }

    obtenerImpares() {
        return this.numeros.filter(numero => !numero.esPar()).map(num => num.valor);
    }
}


const listaNumeros = new ListaNumeros();


function generarNumeros() {
    listaNumeros.numeros = [];

    for (let i = 0; i < 20; i++) {
        const valorAleatorio = Math.floor(Math.random() * 100);
        listaNumeros.agregarNumero(valorAleatorio);
    }

    mostrarResultados(listaNumeros);
}

// Función para mostrar los resultados en el HTML
function mostrarResultados(lista) {
    const paresElement = document.getElementById('pares');
    const imparesElement = document.getElementById('impares');

    paresElement.innerHTML = lista.obtenerPares().join(', ');
    imparesElement.innerHTML = lista.obtenerImpares().join(', ');
}
