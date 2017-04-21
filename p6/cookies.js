var enviar =  document.getElementById("enviar");
var formulario = document.forms[0].elements
llenar_formulario();
enviar.addEventListener("click", function(e) {
    e.preventDefault();
    for(var i = 0; i < formulario.length; i++) {
        var etiqueta = formulario[i].tagName.toLowerCase();
        if(etiqueta == "input"){
            if(formulario[i].type == "text")
                document.cookie = formulario[i].id +"="+ formulario[i].value;
            else if(formulario[i].type == "checkbox") {
                if(formulario[i].checked)
                    document.cookie = formulario[i].id +"="+ formulario[i].value;
                else
                    document.cookie = formulario[i].id + "=" + formulario[i].value + ";expires=Thu, 18 Dec 2013 12:00:00 GMT"
            } else if(formulario[i].type == "radio"){
                var radios = document.getElementsByName("rdEscuela");
                for (var item of radios)
                    if(item.checked)
                        document.cookie = formulario[i].id +"="+ item.value;
            }
        } else if(etiqueta == "select") {
            var select = formulario[i];
            var indice = select.selectedIndex;
            if (indice >= 0) {
                var valor = select.options[indice].value;
                document.cookie = formulario[i].id +"="+ valor;
            }
        } else if(etiqueta =="textarea")
            document.cookie = formulario[i].id +"="+ formulario[i].value;
    }
});

function llenar_formulario(){
    var elementos = (document.cookie).split(";");
    for(var i = 0; i < elementos.length; i++){
        var elemento = elementos[i].split("=");
        var id = elemento[0];
        id = formatear(id);
        var elementoDOM = document.getElementById(id);
        if(elementoDOM != null){
            if(elementoDOM.type == "text")
                elementoDOM.value = elemento[1];
            else if(elementoDOM.tagName.toLowerCase() == "select" ||  elementoDOM.tagName.toLowerCase() == "textarea")
                elementoDOM.value = elemento[1];
            else if(elementoDOM.name == "rdEscuela") {
                if(elementoDOM.value == elemento[1])
                    elementoDOM.checked = true;
            } else if(elementoDOM.type == "checkbox"){
                elementoDOM.checked =  true;
            }
        }
    }
}
function formatear(text){
    var id = "";
    for(var i = 0; i< text.length; i++)
        if(text[i] != ' ')
            id += text[i];
    return id;
}
