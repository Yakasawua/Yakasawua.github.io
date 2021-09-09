function Select(e){
    document.getElementById("linea").className = "btn btn-no";
    document.getElementById("lapiz").className = "btn btn-no";
    document.getElementById("elipse").className = "btn btn-no";
    document.getElementById("circulo").className = "btn btn-no";
    document.getElementById("rectangulo").className = "btn btn-no";
    document.getElementById("cuadrado").className = "btn btn-no";
    document.getElementById("borrador").className = "btn btn-no";
    document.getElementById(e).className = "btn btn-yes";
    Toolselect = e;
}

function color(tipo) {
    if (tipo == 'c') {
        let color = document.getElementById("c_color").value;
         c_color = color;
        
    } else {
        let color = document.getElementById("r_color").value;
         r_color = color;
    }
  }

window.addEventListener("load", start, false);
let Toolselect = 'linea';
var c_color = "#000000";
var r_color = "#000000";
var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
var dibujos = {
    dibujos: {}
}
function start(){
    var cls = document.getElementById("cls");
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var dibujar = false;
    var Trazados = [];
    var puntos = [];
    ctx.lineJoin = "round";

    cls.addEventListener('click', ()=>{
        dibujar = false;
        ctx.clearRect(0, 0 , canvas.width, canvas.height);
        Trazados.length = 0;
        puntos.length = 0;
    }, false);

    canvas.addEventListener('mousedown', (e)=>{
        x1 = e.layerX;
        y1 = e.layerY;
        dibujar = true;
        puntos.length = 0;
        ctx.beginPath();
    },false);

    canvas.addEventListener('mouseup', ()=>{
        dibujar=false;
        dibujos.dibujos[Object.keys(dibujos.dibujos).length] =
        {
            "tipo": Toolselect,
            "c_contorno": c_color,
            "c_relleno": r_color,
            "x1": x1,
            "y1": y1,
            "x2": x2,
            "y2": y2
        };
        redibujarTrazados();
        redibujarfiguras();
    },false);

    canvas.addEventListener('mouseout', ()=>{
        dibujar=false;
        redibujarTrazados();
        redibujarfiguras();
    },false);

    canvas.addEventListener('mousemove', (e)=>{
        if (dibujar) {
            if (Toolselect == "lapiz") {
                var m = MousePos(canvas, e);
                puntos.push(m);
                ctx.lineTo(m.x, m.y);
                ctx.stroke();
            } else {
                console.log("otra cosa");
            }
        }
    },false);


    function redibujarTrazados(){

    }

    function redibujarfiguras(){

    }

    function MousePos(canvas, e){
        var canvasRect = canvas.getBoundingClientRect();
        return{
            x: Math.round(e.clientX - canvasRect.left),
            y: Math.round(e.clientY - canvasRect.top)
        }
    }
}