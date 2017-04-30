var agregar = document.getElementById("agregar");
var agregar_materia = document.getElementById("extra");
var borrar = document.getElementById("borrar");
var anterior = document.getElementById("anterior");
var siguiente = document.getElementById("siguiente");
var alumnos = new Array();
var posicion = -1;
function Materia() {
    this.materia;
    this.calificacion;
}
function Alumno() {
    this.nombre;
    this.curp;
    this.boleta;
    this.semestre;
    this.correo;
    this.telefono
    this.calificaciones;
}

Alumno.prototype.set_nombre = function(nombre) {
    this.nombre = nombre;
};
Alumno.prototype.set_curp = function(curp) {
    this.curp = curp;
};
Alumno.prototype.set_boleta = function(boleta) {
    this.boleta = boleta;
};
Alumno.prototype.set_semestre = function(semestre) {
    this.semestre = semestre;
};
Alumno.prototype.set_correo = function(correo) {
    this.correo = correo;
};
Alumno.prototype.set_telefono = function(telefono) {
    this.telefono = telefono;
};
Alumno.prototype.set_materias = function(materias) {
    this.materias = materias;
};
Alumno.prototype.get_nombre = function() {
    return this.nombre;
};
Alumno.prototype.get_curp = function() {
    return this.curp;
};
Alumno.prototype.get_boleta = function() {
    return this.boleta;
};
Alumno.prototype.get_semestre = function() {
    return this.semestre;
};
Alumno.prototype.get_correo = function() {
    return this.correo;
};
Alumno.prototype.get_telefono = function() {
    return this.telefono;
};
Alumno.prototype.get_materias = function() {
    return this.materias;
};

Materia.prototype.set_materia = function(materia) {
    this.materia = materia;
};
Materia.prototype.set_calificacion = function(calificacion) {
    this.calificacion = calificacion;
};
Materia.prototype.get_materia = function() {
    return this.materia;
};
Materia.prototype.get_calificacion = function() {
    return this.calificacion;
};

function eliminar(opcion) {
    var padre = document.getElementById("materias");
    var ultimo = padre.lastChild;
    var primero = padre.firstChild;
    while ((ultimo != primero)) {
        padre.removeChild(ultimo);
        ultimo = padre.lastChild;
    }
    if (opcion)
        padre.removeChild(ultimo);
    else {
        document.getElementsByName("materia")[0].value = "";
        document.getElementsByName("calificacion")[0].value = "";
    }
}

function agregar_elemento(contenedor, materia, calificacion) {
    var label_materia = document.createElement("label");
    var br = document.createElement("br");
    var label_calificacion = document.createElement("label");
    var input_materia = document.createElement("input");
    input_materia.setAttribute("type", "text");
    input_materia.setAttribute("name", "materia");
    var input_calificacion = document.createElement("input");
    input_calificacion.setAttribute("type", "text");
    input_calificacion.setAttribute("name", "calificacion");
    var materia_contenido = document.createTextNode("Materia ");
    var calificacion_contenido = document.createTextNode(" Calificación ");
    var span = document.createElement("span");
    input_materia.setAttribute("value", materia);
    input_calificacion.setAttribute("value", calificacion);
    label_materia.appendChild(materia_contenido);
    label_materia.appendChild(input_materia);
    label_calificacion.appendChild(calificacion_contenido);
    label_calificacion.appendChild(input_calificacion);
    span.appendChild(label_materia);
    span.appendChild(label_calificacion);
    span.appendChild(br);
    contenedor.appendChild(span);
}

function cargar_materias() {
    eliminar(true);
    var contenedor = document.getElementById("materias");
    document.getElementById("nombre").value = alumnos[posicion].get_nombre();
    document.getElementById("curp").value = alumnos[posicion].get_curp();
    document.getElementById("semestre").value = alumnos[posicion].get_semestre();
    document.getElementById("correo").value = alumnos[posicion].get_correo();
    document.getElementById("telefono").value = alumnos[posicion].get_telefono();
    document.getElementById("boleta").value = alumnos[posicion].get_boleta();
    var calificaciones = alumnos[posicion].get_materias();
    for (var calificacion of calificaciones)
        agregar_elemento(contenedor, calificacion.get_materia(), calificacion.get_calificacion());
}

agregar.addEventListener("click", function(e) {
    e.preventDefault();
    var alumno = new Alumno();
    var nombre = document.getElementById("nombre").value;
    var curp = document.getElementById("curp").value;
    var boleta = document.getElementById("boleta").value;
    var semestre = document.getElementById("semestre").value;
    var correo = document.getElementById("correo").value;
    var telefono = document.getElementById("telefono").value;
    var materias_lista = document.getElementsByName("materia");
    var calificaciones_lista = document.getElementsByName("calificacion");
    var materias = new Array();
    for (var i = 0; i < materias_lista.length; i++) {
        var materia = new Materia();
        materia.set_materia(materias_lista[i].value);
        materia.set_calificacion(calificaciones_lista[i].value);
        materias.push(materia);
    }
    alumno.set_nombre(nombre);
    alumno.set_curp(curp);
    alumno.set_semestre(semestre);
    alumno.set_correo(correo);
    alumno.set_telefono(telefono);
    alumno.set_materias(materias);
    alumno.set_boleta(boleta);
    alumnos.push(alumno);
    alert("Alumno agregado");
    posicion++;
});

agregar_materia.addEventListener("click", function(e) {
    e.preventDefault();
    var contenedor = document.getElementById("materias");
    agregar_elemento(contenedor, "", "");
});

borrar.addEventListener("click", function(e) {
    e.preventDefault();
    if (posicion < 0)
        alert("No hay elementos que borrar");
    else {
        document.getElementById("nombre").value = "";
        document.getElementById("curp").value = "";
        document.getElementById("semestre").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("telefono").value = "";
        document.getElementById("boleta").value = "";
        eliminar(false);
        alumnos.splice(posicion, 1);
        posicion--;
    }
});

anterior.addEventListener("click", function(e) {
    e.preventDefault();
    if (posicion < 1)
        alert("Fin de la lista");
    else {
        posicion--;
        cargar_materias();
    }
});

siguiente.addEventListener("click", function(e) {
    e.preventDefault();
    if (posicion >= alumnos.length-1)
        alert("Fin de la lista");
    else {
        posicion++;
        cargar_materias();
    }
});
