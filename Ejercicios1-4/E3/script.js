class Alumno {
    constructor(nombre, calificacion) {
        this.nombre = nombre;
        this.calificacion = calificacion;
    }

    aprobado() {
        return this.calificacion >= 7;
    }
}

class ListaAlumnos {
    constructor() {
        this.lista = [];
    }

    agregarAlumno(alumno) {
        this.lista.push(alumno);
    }

    obtenerAlumnos() {  
        return this.lista;
    }

    obtenerAlumnosAprobados() {
        return this.lista.filter(alumno => alumno.aprobado());
    }

    obtenerAlumnosReprobados() {
        return this.lista.filter(alumno => !alumno.aprobado());
    }
}

const listaAlumnos = new ListaAlumnos();

document.getElementById('agregar-btn').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    const calificacion = parseFloat(document.getElementById('calificacion').value.trim());

    if (nombre && !isNaN(calificacion)) {
        const nuevoAlumno = new Alumno(nombre, calificacion);
        listaAlumnos.agregarAlumno(nuevoAlumno);
        mostrarAlumnos();
        document.getElementById('nombre').value = '';
        document.getElementById('calificacion').value = '';
    }
});

function mostrarAlumnos() {
    const alumnosDiv = document.getElementById('alumnos-list');
    const aprobadosDiv = document.getElementById('aprobados-list');
    const reprobadosDiv = document.getElementById('reprobados-list');

    alumnosDiv.innerHTML = '';
    aprobadosDiv.innerHTML = '';
    reprobadosDiv.innerHTML = '';

    listaAlumnos.obtenerAlumnos().forEach(alumno => {
        const alumnoDiv = document.createElement('div');
        alumnoDiv.classList.add('alumno');
        alumnoDiv.innerHTML = `<span><strong>${alumno.nombre}</strong> - Calificación: ${alumno.calificacion}</span>`;
        alumnosDiv.appendChild(alumnoDiv);
    });

    listaAlumnos.obtenerAlumnosAprobados().forEach(alumno => {
        const aprobadoDiv = document.createElement('div');
        aprobadoDiv.classList.add('alumno');
        aprobadoDiv.innerHTML = `<span><strong>${alumno.nombre}</strong> - Calificación: ${alumno.calificacion} (Aprobado)</span>`;
        aprobadosDiv.appendChild(aprobadoDiv);
    });

    listaAlumnos.obtenerAlumnosReprobados().forEach(alumno => {
        const reprobadoDiv = document.createElement('div');
        reprobadoDiv.classList.add('alumno');
        reprobadoDiv.innerHTML = `<span><strong>${alumno.nombre}</strong> - Calificación: ${alumno.calificacion} (Reprobado)</span>`;
        reprobadosDiv.appendChild(reprobadoDiv);
    });
}
