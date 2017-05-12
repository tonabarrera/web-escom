var lista = new Array();
var btnInsertar = document.getElementById("btn-insertar");
var btnCrear = document.getElementById("btn-crear");
var btnMeter = document.getElementById("btn-meter");
var btnMeter2 = document.getElementById("btn-meter2");
var btnMeter3 = document.getElementById("btn-meter3");
var btnSacar = document.getElementById("btn-sacar");
var btnAdios = document.getElementById("btn-adios")
var btnAdios2 = document.getElementById("btn-adios2");
var btnAdios3 = document.getElementById("btn-adios3");
var cont1 = document.getElementById("contenedor1");
var cont2 = document.getElementById("contenedor2");
var cont3 = document.getElementById("contenedor3");
var codeContainer = document.getElementById("code-container");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.lineWidth="2";
context.strokeStyle="orange";
context.font = "16px Arial";
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var widthRect = 50;
var heightRect = 30;
var coordX = canvasWidth-widthRect-5;
var coordY = canvasHeight-heightRect-5;
var stackPositionX = 10;
var stackPositionY = 200;
var BOTTOM = stackPositionY;
var LEFT = stackPositionX;
var nodeValue;

function drawList() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    stackPositionX = LEFT;
    for (var nodo of lista){
        context.beginPath();
        context.fillText(nodo, stackPositionX+5, stackPositionY+20);
        context.rect(stackPositionX, stackPositionY, widthRect, heightRect);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(stackPositionX+widthRect-5, stackPositionY);
        context.lineTo(stackPositionX+widthRect-5, stackPositionY+heightRect)
        context.moveTo(stackPositionX+widthRect, stackPositionY+15);
        context.lineTo(stackPositionX+widthRect+25, stackPositionY+15);
        if (nodo !==lista[lista.length-1]){
            context.moveTo(stackPositionX+widthRect+25, stackPositionY+15);
            context.lineTo(stackPositionX+widthRect+15, stackPositionY+10);
            context.moveTo(stackPositionX+widthRect+25, stackPositionY+15);
            context.lineTo(stackPositionX+widthRect+15, stackPositionY+20);
        }
        context.stroke();
        context.closePath();
        stackPositionX = stackPositionX+widthRect+25;
    }
    if (lista.length>0) {
        context.beginPath();
        context.moveTo(stackPositionX, stackPositionY+15);
        context.lineTo(stackPositionX, stackPositionY+33);
        for (var i=3; i<10; i = i+3) {
            context.moveTo(stackPositionX-i, stackPositionY+33-i);
            context.lineTo(stackPositionX+i, stackPositionY+33-i);
        }
        context.stroke();
        context.closePath();
    }
    context.clearRect(0, 231, canvasWidth, canvasHeight);
    context.clearRect(0, 231, canvasWidth, canvasHeight);
    context.clearRect(0, 231, canvasWidth, canvasHeight);
    
}

function loadList() {
    if(localStorage.getItem("lista")){
        lista = JSON.parse(localStorage.getItem("lista"));
        drawList();
    }
}

function adiosNodo(index) {
    if (isInt(index) && lista.length>=index && index>0) {
        document.getElementById("text-sacar").value = "";
        lista.splice(index-1, 1);
        localStorage.setItem("lista", JSON.stringify(lista));
        cont3.className = "hidden";
        btnSacar.disabled = false;
        btnAdios.disabled = true;
        btnAdios2.disabled = true;
        btnAdios3.disabled = true;
        drawList();
        loadCode(2);
    } else
        alert("Dato incorrecto");
}

function loadCode(option) {
    var imagenes = ["crear", "insertar", "sacar"];
    console.log(option);
    codeContainer.innerHTML = '<img src="./img/'+imagenes[option]+'.png" width=400px class="borde">';
}

function isInt(value) {
    if (isNaN(value))
        return false
    var x = parseFloat(value);
    return (x | 0) === x
}
function dibuja() {
    context.clearRect(0, 231, canvasWidth, canvasHeight);
    context.clearRect(coordX, coordY-1, widthRect, heightRect);
    context.beginPath();
    context.moveTo(coordX+widthRect-5, coordY);
    context.lineTo(coordX+widthRect-5, coordY+heightRect)
    context.fillText(nodeValue,coordX+5, coordY+20);
    context.rect(coordX, coordY, widthRect, heightRect);
    context.stroke();
    context.closePath();
}
function animate(index) {
    if (isInt(index) && lista.length>=index-1 && index>0) {
        var raf = window.requestAnimationFrame(dibuja);
        stackPositionX = LEFT;
        for (var i=0; i<index-1; i++)
            stackPositionX = stackPositionX+widthRect+25;
        var interval = setInterval(function(){
            if (coordX != stackPositionX)
                coordX = coordX-1;
            else if (coordY != stackPositionY)
                coordY = coordY-1;
            if (coordY == stackPositionY && coordX == stackPositionX){
                window.cancelAnimationFrame(raf);
                coordX = canvasWidth-widthRect-5;
                coordY = canvasHeight-heightRect-5;
                for (var i =0; i< lista.length+100; i++)
                    context.clearRect(0, 152, canvasWidth, canvasHeight);
                drawList();
                clearInterval(interval);
            } else
                raf = window.requestAnimationFrame(dibuja);
        }, 2);
        loadCode(1);
        document.getElementById("text-position").value="";
        lista.splice(index-1, 0, nodeValue);
        localStorage.setItem("lista", JSON.stringify(lista));
        cont2.className = "hidden";
        btnMeter.disabled = true;
        btnInsertar.disabled = false;
        btnMeter2.disabled = true;
        btnMeter3.disabled = true;
    } else
        alert("Dato incorrecto");
}

btnInsertar.addEventListener("click", function(e) {
    e.preventDefault();
    context.clearRect(0, 231, canvasWidth, canvasHeight);
    if (lista.length>8) {
        alert("Lista llena");
        return;
    }
    cont1.className = "";
    btnInsertar.disabled = true;
    btnCrear.disabled = false;
});

btnCrear.addEventListener("click", function(e) {
    e.preventDefault();
    nodeValue = document.getElementById("text-nodo").value;
    if (isInt(nodeValue)) {
        document.getElementById("text-nodo").value = "";
        cont1.className = "hidden";
        cont2.className = "";
        btnMeter.disabled = false;
        btnMeter2.disabled = false;
        btnMeter3.disabled = false;
        btnCrear.disabled = true;
        context.beginPath();
        context.moveTo(coordX+widthRect-5, coordY);
        context.lineTo(coordX+widthRect-5, coordY+heightRect)
        context.fillText(nodeValue, coordX+5, coordY+20);
        context.rect(coordX, coordY, widthRect, heightRect);
        context.stroke();
        context.closePath();
        loadCode(0);
    } else
        alert("Dato incorrecto");
});

btnMeter.addEventListener("click", function(e) {
    e.preventDefault();
    var index = document.getElementById("text-position").value;
    animate(index);
});

btnMeter2.addEventListener("click", function (e) {
    e.preventDefault();
    animate(1);
});

btnMeter3.addEventListener("click", function (e) {
    e.preventDefault();
    animate(lista.length+1);
});

btnSacar.addEventListener("click", function(e) {
    e.preventDefault();
    context.clearRect(0, 231, canvasWidth, canvasHeight);
    if (lista.length < 1){
        alert("No hay elementos que sacar de la lista");
        return;
    }
    cont3.className = "";
    btnSacar.disabled = true;
    btnAdios.disabled = false;
    btnAdios2.disabled = false;
    btnAdios3.disabled = false;
});

btnAdios.addEventListener("click", function(e) {
    e.preventDefault();
    var index = document.getElementById("text-sacar").value;
    adiosNodo(index)
});

btnAdios2.addEventListener("click", function(e) {
    e.preventDefault();
    adiosNodo(1);
});

btnAdios3.addEventListener("click", function(e) {
    e.preventDefault();
    adiosNodo(lista.length);
});

loadList();
