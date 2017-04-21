function cadenas() {
    var cadena_final = "";
    var cadena_aux = [];
    var contador_A = 0;
    var contador_E = 0;
    var contador_I = 0;
    var contador_O = 0;
    var contador_U = 0;

    var cadena = prompt("Por favor ingresa una cadena", "");
    var cadena_mayusculas = cadena.toUpperCase();
    cadena_final += "Cadena en mayusculas: " + cadena_mayusculas;
    var cadena_minusculas = cadena.toLowerCase();
    cadena_final += "\nCadena en minusculas: " + cadena_minusculas;

    for (var caracter of cadena_mayusculas) {
        cadena_aux.unshift(caracter)
        if(caracter == "A")
            contador_A++;
        else if(caracter == "E")
            contador_E++;
        else if(caracter == "I")
            contador_I++;
        else if(caracter == "O")
            contador_O++;
        else if(caracter == "U")
            contador_U++;
    }

    if (cadena_mayusculas.split(" ").join("") == cadena_aux.join("").split(" ").join(""))
        cadena_final += "\nLa cadena es palindromo";
    else
        cadena_final += "\nLa cadena no es palindromo";

    cadena_final += "\nNúmero de A: " + contador_A;
    cadena_final += "\nNúmero de E: " + contador_E;
    cadena_final += "\nNúmero de I: " + contador_I;
    cadena_final += "\nNúmero de O: " + contador_O;
    cadena_final += "\nNúmero de U: " + contador_U;
    if(cadena != null)
        alert(cadena_final);
}

function numeros() {
    var numero = prompt("Ingresa un numéro");
    var cadena_final = "";
    var contador = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var cadena_aux = [];
    var factorial = 0;

    for (var caracter of numero) {
        cadena_aux.unshift(caracter);
        if(caracter=="0")
            contador[0]++;
        else if(caracter == "1")
            contador[1]++;
        else if(caracter == "2")
            contador[2]++;
        else if(caracter == "3")
            contador[3]++;
        else if(caracter == "4")
            contador[4]++;
        else if(caracter == "5")
            contador[5]++;
        else if(caracter == "6")
            contador[6]++;
        else if(caracter == "7")
            contador[7]++;
        else if(caracter == "8")
            contador[8]++;
        else if(caracter == "9")
            contador[9]
    }
    if(numero == cadena_aux.join(""))
        cadena_final += "El número es capicúa";
    else
        cadena_final += "El número no es capicúa";
    for (var i = 0; i < 10; i++) {
        cadena_final += "\nNúmero de " + i + " es: " + contador[i];
    }
    cadena_final += "\nCadena al reves: " + cadena_aux.join("");
    factorial = calcular_factorial(parseInt(numero));
    cadena_final += "\nEl factorial " + numero +"! es: " + factorial;

    if(numero != null)
        alert(cadena_final)
}

function calcular_factorial(numero) {
    if (numero == 0 || numero == 1) {
        return 1;
    }
    return numero * calcular_factorial(numero-1);
}
