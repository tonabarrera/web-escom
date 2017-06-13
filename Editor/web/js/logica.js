function init() {
    var goMake = go.GraphObject.make;

    myDiagram = goMake(go.Diagram, "myDiagramDiv", {
        "animationManager.isEnabled":false,
        initialContentAlignment: go.Spot.Center, 
        allowDrop: true, 
        "LinkDrawn": showLinkLabel, 
        "LinkRelinked": showLinkLabel,
        "model.linkFromPortIdProperty": "fromPort",
        "model.linkToPortIdProperty": "toPort"
    });

    myDiagram.addDiagramListener("Modified", function(e) {
        var button = document.getElementById("SaveButton");
        if (button) button.disabled = !myDiagram.isModified;
        var idx = document.title.indexOf("*");
        if (myDiagram.isModified)
            if (idx < 0) document.title += "*";
        else
            if (idx >= 0) document.title = document.title.substr(0, idx);
    });

    function nodeStyle() {
        return [    
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), {
                locationSpot: go.Spot.Center,
                mouseEnter: function (e, obj) { showPorts(obj.part, true); },
                mouseLeave: function (e, obj) { showPorts(obj.part, false); }
            }
        ];
    }

    // Funcion para crear los nodos de cada elemento
    function makePort(name, spot, output, input) {
        // El nodo es un circulo pequeño
        return goMake(go.Shape, "Circle", {
            fill: "transparent",
            stroke: null,
            desiredSize: new go.Size(8, 8),
            alignment: spot, alignmentFocus: spot,
            portId: name,
            fromSpot: spot, toSpot: spot,
            fromLinkable: output, toLinkable: input,
            cursor: "pointer"
        });
    }

    // Algunos colores extra
    var lightText = 'whitesmoke';
    var blackText = 'black';

    // Nodos extra
    myDiagram.nodeTemplateMap.add("", goMake(go.Node, "Spot", nodeStyle(),
        goMake(go.Panel, "Auto",
            goMake(go.Shape, "Rectangle", {
                stroke: blackText, 
                strokeWidth: 2, 
                fill: "white"
            },
            new go.Binding("figure", "figure"),
            new go.Binding("fill", "color"),
            new go.Binding("stroke", "contorno")),
            goMake(go.TextBlock, {
                font: "bold 11pt Helvetica, Arial, sans-serif",
                stroke: blackText,
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true
            },
            new go.Binding("text").makeTwoWay(),
            new go.Binding("stroke", "fuente"))
        ),
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, true, true),
        makePort("R", go.Spot.Right, true, true),
        makePort("B", go.Spot.Bottom, true, false)
    ));
    // Condition
    myDiagram.nodeTemplateMap.add("Condition", goMake(go.Node, "Spot", nodeStyle(),
        goMake(go.Panel, "Auto",
            goMake(go.Shape, "Diamond", {
                minSize:new go.Size(60, 60),
                stroke:blackText, 
                strokeWidth:2, 
                fill:"white"
            }, 
            new go.Binding("fill", "color"),
            new go.Binding("stroke", "contorno")),
            goMake(go.TextBlock, "Start", {
                font: "bold 10pt Helvetica, Arial, sans-serif", 
                stroke: blackText,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true
            },
            new go.Binding("text").makeTwoWay(),
            new go.Binding("stroke", "fuente"))
        ),
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, true, false),
        makePort("R", go.Spot.Right, true, false),
        makePort("B", go.Spot.Bottom, true, false)
    ));

    //Nodo inicio
    myDiagram.nodeTemplateMap.add("Start", goMake(go.Node, "Spot", nodeStyle(),
        goMake(go.Panel, "Auto",
            goMake(go.Shape, "Circle", {
                minSize:new go.Size(40, 40),
                stroke:blackText, 
                strokeWidth:2, 
                fill:"white"
            }, 
            new go.Binding("fill", "color"),
            new go.Binding("stroke", "contorno")),
            goMake(go.TextBlock, "Start", {
                font: "bold 11pt Helvetica, Arial, sans-serif", 
                stroke: blackText
            },
            new go.Binding("text"),
            new go.Binding("stroke", "fuente"))
        ),
        makePort("B", go.Spot.Bottom, true, false)
    ));

    // Nodo fin
    myDiagram.nodeTemplateMap.add("End", goMake(go.Node, "Spot", nodeStyle(),
        goMake(go.Panel, "Auto",
            goMake(go.Shape, "Circle", {
                minSize:new go.Size(40, 40), 
                stroke:blackText, 
                fill:"white", 
                strokeWidth:2
            },
            new go.Binding("fill", "color"),
            new go.Binding("stroke", "contorno")),
            goMake(go.TextBlock, "End", {
                font: "bold 11pt Helvetica, Arial, sans-serif", 
                stroke: blackText
            },
            new go.Binding("text"),
            new go.Binding("stroke", "fuente"))
        ),
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, false, true),
        makePort("R", go.Spot.Right, false, true)
    ));

    // La forma en la que se enlazaran los nodos
    myDiagram.linkTemplate = goMake(go.Link, {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 5, 
        toShortLength: 4,
        relinkableFrom: true,
        relinkableTo: true,
        reshapable: true,
        resegmentable: true,
        mouseEnter: function(e, link) {
            link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
        },
        mouseLeave: function(e, link) {
            link.findObject("HIGHLIGHT").stroke = "transparent";
        }
    },
    new go.Binding("points").makeTwoWay(),
    goMake(go.Shape, {isPanelMain:true, strokeWidth:8, stroke:"transparent", name:"HIGHLIGHT"}),
    goMake(go.Shape, {isPanelMain:true, stroke:"gray", strokeWidth:2}),
    goMake(go.Shape, {toArrow:"standard", stroke:null, fill:"gray"}),
    goMake(go.Panel, "Auto",
        {visible:false, name:"LABEL", segmentIndex:2, segmentFraction:0.5},
        new go.Binding("visible", "visible").makeTwoWay(),
        goMake(go.Shape, "RoundedRectangle", {fill:"#F8F8F8", stroke:null }),
        goMake(go.TextBlock, "Yes", {
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "#333333",
            editable: true
        },
        new go.Binding("text").makeTwoWay())
    ));

    /*Para que muestre la etiqueta si es una codicional*/
    // Disparado por "LinkDrawn" y "LinkRelinked"
    function showLinkLabel(e) {
        var label = e.subject.findObject("LABEL");
        if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
    }

    // Esto no se para que sirva
    myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
    myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

    // Esto crea la paleta de inicio
    myPalette = goMake(go.Palette, "myPaletteDiv", {
        nodeTemplateMap: myDiagram.nodeTemplateMap,
        "animationManager.isEnabled":false,
        model: new go.GraphLinksModel([
            {category: "Start", text: "Inicio", color:"white", contorno:"black", "fuente":"black"},
            {category: "Simple", text: "Sentencia\n Simple", color:"lightblue", contorno:"black", "fuente":"black"},
            {category: "Declare", text: "Declarar\n variable", figure:"createRequest", color:"lightgreen", contorno:"black", fuente:"black"},
            {category: "Output", text: "Salida \n de datos", figure: "document", color:"#754d68", contorno:"black", fuente:"black"},
            {category: "Input", text: "Entrada\n de datos", figure:"card", color:"lightyellow", contorno:"black", fuente:"black"},
            {category: "While", text: "Ciclo", figure: "Diamond", color:"#3b4b5b", contorno:"black", fuente:"black"},
            {category: "End", text: "Fin", color:"#d0204e", contorno:"black", fuente:"black"},
            {category: "Condition", text: "Condición", figure: "Diamond", color:"purple", contorno:"balck", fuente:"black"}
        ])
    });

    //Para que la pagina no se mueva al arrastrar un elemento
    function customFocus() {
        var x = window.scrollX || window.pageXOffset;
        var y = window.scrollY || window.pageYOffset;
        go.Diagram.prototype.doFocus.call(this);
        window.scrollTo(x, y);
    }
    myDiagram.doFocus = customFocus;
    myPalette.doFocus = customFocus;

    /*para que no se pueda editar el nodo de inicio y fin usado en el inspector*/
    function isReadOnly(propertyName, newValue) {
        if (propertyName.category==="Start" || propertyName.category==="End")
            return true;
        return false;
    }

    // Esto crea la barra de herramientas
    var inspector = new Inspector('myInspectorDiv', myDiagram, {
        includesOwnProperties: false,
        properties: {
            "text": {readOnly:isReadOnly},
            "color": {show: Inspector.showIfPresent, type: 'color'},
            "contorno":{show: Inspector.showIfPresent, type: 'color'},
            "fuente":{show: Inspector.showIfPresent, type: 'color'}
        }
    });
    // Le pasamos data inicial para que muestre la barra de herramientas
    myDiagram.model = go.Model.fromJson({
        class: "go.GraphLinksModel", 
        linkFromPortIdProperty: "fromPort",
        linkToPortIdProperty: "toPort",
        nodeDataArray: [{category:"Start", text:"Inicio", color:"white", contorno:"black", fuente:"black", key:-1, loc:"0 0"} ],
        linkDataArray: []
    });
    //Para que se muestre la barra de herramientas
    inspector.inspectObject(myDiagram.nodes.first().data);
} // fin init

//Hace que se muestren los nodos al pasar el mouse sobre el elemento
function showPorts(node, show) {
    var diagram = node.diagram;
    if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
    node.ports.each(function(port) {
        port.stroke = (show ? "lightgray" : null);
    });
}

// Recuperamos el diagrama y lo guardamos
$('#SaveButton').on('click', function(e) {
    console.log("hola");
    var diagrama = myDiagram.model.toJson();
    let nombre = prompt("Ingrese un nombre de archivo sin extención", 'diagrama');
    $.ajax({
        url: "GuardarDiagrama",
        type: "POST",
        data: {"diagrama":diagrama, "nombre": nombre},
        success: function(json){
            console.log(json);
            alert('Diagrama guardado');
        },
        error: function(xhr, errmsg, err) {
            console.log(xhr.status+": "+xhr.responseText);
            alert('No se pudo guardar el proyecto');
        }
    });
    myDiagram.isModified = false;
});
/*Funcion para cargar el diagrama en el canvas*/
function consultar_archivos() {
    $.ajax({
        url: "ConsultarArchivos",
        type: "POST",
        success: function(json){
            debugger;
            let archivos = "";
            for (let elemento of json.diagramas) {
                archivos += elemento.nombre;
                archivos += "\n";
            }
            var archivo = prompt(archivos+'Ingrese el nombre del archivo a cargar', 'diagrama.json');
            load(archivo);
        },
        error: function(xhr, errmsg, err) {
            debugger;
            console.log(xhr.status+": "+xhr.responseText);
            alert('Ups ocurrio un error');
        }
    });
}

function load(archivo) {
    $.ajax({
        url: "CargarDiagrama",
        type: "POST",
        data: {"nombre": archivo},
        success: function(json){
            console.log(json);
            myDiagram.model = go.Model.fromJson(json);
        },
        error: function(xhr, errmsg, err) {
            console.log(xhr.status+": "+xhr.responseText);
            alert('Ups ocurrio un error');
        }
    });
}

function generateCode(){
    var data = myDiagram.model.toJson();
    var datos =JSON.parse(data);
    var nodos = datos.nodeDataArray;
    var links = datos.linkDataArray;
    let id;
    for (let pos=0; pos<nodos.length; pos++){
        if (nodos[pos].category === "Start") {
            id = nodos[pos].key;
            break;
        } else {
            console.log("NO lo haga");
        }
    }
    let elemento;
    let existe = false;
    for (let pos=0; pos<links.length; pos++){
        if (links[pos].from === id) {
            elemento = links[pos];
            existe = true;
            break;
        } else {
            console.log("NO lo haga(2)");
        }
    }
    var variables_totales = new Array();
    let codigo = "#include &ltstdio.h&gt\n";
    let nodos_visitados = new Array();
    while (existe) {
        let key = elemento.from;
        
        for (let j=0; j<nodos.length; j++){
            if (nodos[j].key === key) {
                console.log("for"+nodos[j].category + " " + nodos[j].text);
                if (nodos[j].category === "Start"){
                    codigo += "void main(void){\n";
                } else if (nodos[j].category === "Declare") {
                    let var_nom = nodos[j].text.split(" ")[1];
                    let var_tipo = nodos[j].text.split(" ")[0];
                    variables_totales.push({"var_nom": var_nom, "var_tipo":var_tipo});
                    codigo += "    "+var_tipo+" " + var_nom + ";\n";
                } else if (nodos[j].category === "Input") {
                    let aux_tipo = obtener_tipo(variables_totales, nodos[j].text);
                    codigo += `    scanf(%${aux_tipo}, &${nodos[j].text});\n`;
                } else if (nodos[j].category === "Output") {
                    let temp =nodos[j].text.split(',');
                    let aux_tipo = 'i';
                    if (temp.length <=1){
                        if(buscar_variable(temp[0], variables_totales)) {
                            aux_tipo = obtener_tipo(variables_totales, temp[0]);
                            codigo += `    printf("%${aux_tipo}", ${temp[0]});\n`;
                        } else {
                            codigo += `    printf("${temp[0]}");\n`;
                        }
                    } else {
                        let aux_var = temp[1];
                        let contenido = temp[0];
                        debugger;
                        aux_var = aux_var.split(' ')[1];
                        aux_tipo = obtener_tipo(variables_totales, aux_var);
                        codigo += `    printf("${contenido}, %${aux_tipo}", ${aux_var});\n`;
                    }
                } else if (nodos[j].category === "Simple") {
                    codigo += "    " +nodos[j].text + ";\n";
                } else if (nodos[j].category === "Condition") {
                    console.log("condicion " + nodos[j].text + "\n");
                } else if (nodos[j].category === "While") {
                    if (nodos_visitados.indexOf(key) === -1) {
                        console.log("WHILE DO WHILE");
                        codigo += `    while(${nodos[j].text}){\n`;
                        nodos_visitados.push(key);
                    } else {
                        console.log("Cierro while");
                        codigo += `    }\n`;
                        let aux_key = key;
                        for (let cont = 0; cont<links.length; cont++){
                            if (links[cont].from === aux_key) {
                                for (let otro=0; otro<nodos_visitados.length; otro++) {
                                    if (links[cont].to === nodos_visitados[otro]) {
                                        break;
                                    } else {
                                        elemento=links[cont];
                                    }
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }
        var siguiente = elemento.to;
        for (let i=0; i<links.length; i++){
            if (links[i].from === siguiente) {
                existe = true;
                elemento = links[i];
                break;
            } else {
                existe = false;
            }
        }
    }
    /*Ultimo nodo*/
    for (let j=0; j<nodos.length; j++) {
        if (nodos[j].key === siguiente) {
            console.log(nodos[j].category + " " + nodos[j].text);
            codigo += "    return;\n}";
        }
    }
    $('#myCode').html('<pre>'+codigo+'</pre>');
}

function obtener_tipo(variables_totales, texto) {
    let aux_tipo = 'i';
    for (let i=0; i<variables_totales.length; i++){
        if (variables_totales[i].var_nom === texto){
            if (variables_totales[i].var_tipo==='char')
                return 'c';
            else if (variables_totales[i].var_tipo === 'float')
                return 'f';
            else if (variables_totales[i].var_tipo === 'double')
                return 'lf';
            break;
        }
    }
    return 'i';
}

function buscar_variable(variable, variables) {
    for (let i=0; i<variables.length; i++){
        if (variables[i].var_nom === variable){
            return true;
        }
    }
    return false;
}