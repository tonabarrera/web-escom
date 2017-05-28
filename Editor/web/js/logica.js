function init() {
    var goMake = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram = goMake(go.Diagram, "myDiagramDiv", {
        "animationManager.isEnabled":false,
        initialContentAlignment: go.Spot.Center, 
        allowDrop: true, 
        "LinkDrawn": showLinkLabel, 
        "LinkRelinked": showLinkLabel,
        "model.linkFromPortIdProperty": "fromPort",
        "model.linkToPortIdProperty": "toPort"
    });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", function(e) {
        var button = document.getElementById("SaveButton");
        if (button) button.disabled = !myDiagram.isModified;
        var idx = document.title.indexOf("*");
        if (myDiagram.isModified)
            if (idx < 0) document.title += "*";
        else
            if (idx >= 0) document.title = document.title.substr(0, idx);
    });

// helper definitions for node templates

function nodeStyle() {
    return [
    // The Node.location comes from the "loc" property of the node data,
    // converted by the Point.parse static method.
    // If the Node.location is changed, it updates the "loc" property of the node data,
    // converting back using the Point.stringify static method.
    
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), {
        // the Node.location is at the center of each node
        locationSpot: go.Spot.Center,
        // handle mouse enter/leave events to show/hide the ports
        mouseEnter: function (e, obj) { showPorts(obj.part, true); },
        mouseLeave: function (e, obj) { showPorts(obj.part, false); }
    }
    ];
}

    // Define a function for creating a "port" that is normally transparent.
    // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
    // and where the port is positioned on the node, and the boolean "output" and "input" arguments
    // control whether the user can draw links from or to the port.
    function makePort(name, spot, output, input) {
        // the port is basically just a small circle that has a white stroke when it is made visible
        return goMake(go.Shape, "Circle", {
            fill: "transparent",
            stroke: null,  // this is changed to "white" in the showPorts function
            desiredSize: new go.Size(8, 8),
            alignment: spot, alignmentFocus: spot,  // align the port on the main Shape
            portId: name,  // declare this object to be a "port"
            fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
            fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
            cursor: "pointer"
        });
    }

    // define the Node templates for regular nodes
    var lightText = 'whitesmoke';
    var blackText= 'black';

    myDiagram.nodeTemplateMap.add("",  // the default category
        goMake(go.Node, "Spot", nodeStyle(),
        // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
        goMake(go.Panel, "Auto",
            goMake(go.Shape, "Rectangle", {stroke: blackText, strokeWidth: 2, fill: "white"},
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
        // four named ports, one on each side:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, true, true),
        makePort("R", go.Spot.Right, true, true),
        makePort("B", go.Spot.Bottom, true, false)
    ));

    myDiagram.nodeTemplateMap.add("Start", goMake(go.Node, "Spot",
        goMake(go.Panel, "Auto",
            goMake(go.Shape, "Circle", {minSize: new go.Size(40, 40), stroke: blackText, strokeWidth: 2, fill: "white"}, 
            new go.Binding("fill", "color"),
            new go.Binding("stroke", "contorno")),
            goMake(go.TextBlock, "Start",
                {font: "bold 11pt Helvetica, Arial, sans-serif", stroke: blackText},
            new go.Binding("text"),
            new go.Binding("stroke", "fuente"))
        ),nodeStyle(),
        makePort("B", go.Spot.Bottom, true, false)
    ));

    myDiagram.nodeTemplateMap.add("End", goMake(go.Node, "Spot", nodeStyle(),
        goMake(go.Panel, "Auto",
            goMake(go.Shape, "Circle", {minSize: new go.Size(40, 40), stroke: blackText, fill: "white", strokeWidth: 2},
            new go.Binding("fill", "color"),
            new go.Binding("stroke", "contorno")),
            goMake(go.TextBlock, "End",
                {font: "bold 11pt Helvetica, Arial, sans-serif", stroke: blackText},
            new go.Binding("text"),
            new go.Binding("stroke", "fuente"))
        ),
        // three named ports, one on each side except the bottom, all input only:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, false, true),
        makePort("R", go.Spot.Right, false, true)
    ));

    // replace the default Link template in the linkTemplateMap
    myDiagram.linkTemplate = goMake(go.Link, 
    {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 5, 
        toShortLength: 4,
        relinkableFrom: true,
        relinkableTo: true,
        reshapable: true,
        resegmentable: true,
        // mouse-overs subtly highlight links:
        mouseEnter: function(e, link) {
            link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
        },
        mouseLeave: function(e, link) {
            link.findObject("HIGHLIGHT").stroke = "transparent";
        }
    },
    new go.Binding("points").makeTwoWay(),
    goMake(go.Shape,  // the highlight shape, normally transparent
    { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
    goMake(go.Shape,  // the link path shape
    { isPanelMain: true, stroke: "gray", strokeWidth: 2 }),
    goMake(go.Shape,  // the arrowhead
    { toArrow: "standard", stroke: null, fill: "gray"}),
    goMake(go.Panel, "Auto",  // the link label, normally not visible
        { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5},
        new go.Binding("visible", "visible").makeTwoWay(),
        goMake(go.Shape, "RoundedRectangle",  // the label shape
        { fill: "#F8F8F8", stroke: null }),
        goMake(go.TextBlock, "Yes",  // the label
        {
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "#333333",
            editable: true
        },
        new go.Binding("text").makeTwoWay())
    ));

    // Make link labels visible if coming out of a "conditional" node.
    // This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.
    function showLinkLabel(e) {
        var label = e.subject.findObject("LABEL");
        if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
    }

    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
    myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
    myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

    //load();  // load an initial diagram from some JSON text

    // initialize the Palette that is on the left side of the page
    myPalette = goMake(go.Palette, "myPaletteDiv",  // must name or refer to the DIV HTML element
    {
        nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
        model: new go.GraphLinksModel([  // specify the contents of the Palette
            { category: "Start", text: "Inicio", color:"white", contorno:"black", "fuente":"black"},
            { text: "Sentencia\n Simple", color:"lightblue", contorno:"black", "fuente":"black"},
            {text: "Declarar\n variable", figure:"createRequest", color:"lightgreen", contorno:"black", fuente:"black"},
            {text: "Entrada \n de datos", figure: "document", color:"#754d68", contorno:"black", fuente:"black"},
            {text: "Salida\n de datos", figure:"card", color:"lightyellow", contorno:"black", fuente:"black"},
            {text: "Condición\nCiclo", figure: "Diamond", color:"#3b4b5b", contorno:"black", fuente:"black"},
            {category: "End", text: "Fin", color:"#d0204e", contorno:"black", fuente:"black"}
        ])
    });

    // The following code overrides GoJS focus to stop the browser from scrolling
    // the page when either the Diagram or Palette are clicked or dragged onto.

    function customFocus() {
        var x = window.scrollX || window.pageXOffset;
        var y = window.scrollY || window.pageYOffset;
        go.Diagram.prototype.doFocus.call(this);
        window.scrollTo(x, y);
    }

    myDiagram.doFocus = customFocus;
    myPalette.doFocus = customFocus;
    function isReadOnly(propertyName, newValue) {
        if (propertyName.category==="Start" || propertyName.category==="End")
            return true;
        return false;
    }
    var inspector = new Inspector('myInspectorDiv', myDiagram,
          {
            // uncomment this line to only inspect the named properties below instead of all properties on each object:
            includesOwnProperties: false,
            properties: {
              "text": {readOnly:isReadOnly},
              // color would be automatically added for nodes, but we want to declare it a color also:
              "color": {show: Inspector.showIfPresent, type: 'color'},
              "contorno":{show: Inspector.showIfPresent, type: 'color'},
              "fuente":{show: Inspector.showIfPresent, type: 'color'}
              // Comments and LinkComments are not in any node or link data (yet), so we add them here:
            }
          });
     
    myDiagram.model = go.Model.fromJson({
        class: "go.GraphLinksModel", 
        linkFromPortIdProperty: "fromPort",
        linkToPortIdProperty: "toPort",
        nodeDataArray: [{category:"Start", text:"Inicio", color:"white", contorno:"black", fuente:"black", key:-1, loc:"0 0"} ],
        linkDataArray: []});
        inspector.inspectObject(myDiagram.nodes.first().data);
} // end init

// Make all ports on a node visible when the mouse is over the node
function showPorts(node, show) {
    var diagram = node.diagram;
    if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
    node.ports.each(function(port) {
        port.stroke = (show ? "lightgray" : null);
    });
}


// Show the diagram's model in JSON format that the user may edit
function save() {
    var diagrama = myDiagram.model.toJson();
    $.ajax({
        url: "GuardarDiagrama",
        type: "POST",
        data: {"diagrama":diagrama},
        success: function(json){
            console.log(json);
        },
        error: function(xhr, errmsg, err) {
            console.log(xhr.status+": "+xhr.responseText);
        }
    });
    myDiagram.isModified = false;
}
function load() {
    $.ajax({
        url: "CargarDiagrama",
        type: "POST",
        success: function(json){
            console.log(json);
            myDiagram.model = go.Model.fromJson(json);
        },
        error: function(xhr, errmsg, err) {
            console.log(xhr.status+": "+xhr.responseText);
        }
    });
}

/*
// add an SVG rendering of the diagram at the end of this page
function makeSVG() {
var svg = myDiagram.makeSvg({
scale: 0.5
});
svg.style.border = "1px solid black";
obj = document.getElementById("SVGArea");
obj.appendChild(svg);
if (obj.children.length > 0) {
obj.replaceChild(svg, obj.children[0]);
}
}

*/
