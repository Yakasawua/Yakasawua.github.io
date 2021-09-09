window.addEventListener("load", start, false);
let Toolselect = "linea";
var c_color = "#000000";
var r_color = "#000000";
var relleno = true;
var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
var dibujos = {
  dibujos: {}
}

function start() {
  var cls = document.getElementById("cls");
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var reader = new FileReader();
  var cw = canvas.width;
  var ch = canvas.height;

  var dibujar = false;
  var Trazados = [];
  var puntos = [];
  ctx.lineJoin = "round";

  cls.addEventListener('click', () => {
    dibujar = false;
    ctx.clearRect(0, 0, cw, ch);
    Trazados.length = 0;
    puntos.length = 0;
    dibujos = { dibujos:{} };
  }, false);


  canvas.addEventListener('mousedown', (e) => {
    x1 = e.layerX;
    y1 = e.layerY;
    dibujar = true;
    puntos.length = 0;
    ctx.beginPath();
    relleno = document.getElementById("relleno").checked;
  }, false);

  canvas.addEventListener('mouseup', () => {
    dibujar=false;
    dibujos.dibujos[Object.keys(dibujos.dibujos).length] =
    {
      "tipo": Toolselect,
      "c_contorno": c_color,
      "c_relleno": r_color,
      "x1": x1,
      "y1": y1,
      "x2": x2,
      "y2": y2,
      "relleno": relleno
    };
    redibujarTrazados();
    redibujarfiguras();
  }, false);

  canvas.addEventListener("mouseout", () => {
    dibujar = false;
    redibujarTrazados();
    redibujarfiguras();
  }, false);

  canvas.addEventListener("mousemove", (e) => {
    if (dibujar) {
      if (Toolselect == "lapiz") {
        var m = MousePos(canvas, e);
        puntos.push(m);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
      } else {
        ctx.closePath();
        ctx.clearRect(0, 0, cw, ch);
        x2 = e.layerX;
        y2 = e.layerY;
        redibujarTrazados();
        dibujar = true;
        redibujarfiguras();
        dibujar_figuras(Toolselect, x1,x2,y1,y2,c_color, r_color, relleno);
      }
    }
  }, false);

  function reducirArray(elArray) {
    var nuevoArray = [];
    nuevoArray[0] = elArray[0];
    for (var i = 0; i < elArray.length; i++) {
      if (true) {
        nuevoArray[nuevoArray.length] = elArray[i];
      }
    }
    nuevoArray[nuevoArray.length - 1] = elArray[elArray.length - 1];
    Trazados.push(nuevoArray);
  }
  function alisarTrazado(ry) {
    if (ry.length > 1) {
      ctx.beginPath();
      ctx.moveTo(ry[0].x, ry[0].y);
      for (i = 1; i < ry.length - 2; i++) {
        ctx.lineTo(ry[i].x, ry[i].y);
      }
      ctx.stroke();
    }
  }


  function redibujarTrazados(){
    dibujar = false;
    ctx.clearRect(0, 0, cw, ch);
    reducirArray(puntos);
    for(var i = 0; i < Trazados.length; i++)
      alisarTrazado(Trazados[i]);
  }
  function redibujarfiguras(){
    for (let i = 0; i < Object.keys(dibujos.dibujos).length; i++) {
      dibujar_figuras(dibujos.dibujos[i].tipo, dibujos.dibujos[i].x1,dibujos.dibujos[i].x2,dibujos.dibujos[i].y1,dibujos.dibujos[i].y2,
        dibujos.dibujos[i].c_contorno,
        dibujos.dibujos[i].c_relleno,
        dibujos.dibujos[i].relleno);
    }
  }

  function MousePos(canvas, e) {
    var ClientRect = canvas.getBoundingClientRect();
    return {
      x: Math.round(e.clientX - ClientRect.left),
      y: Math.round(e.clientY - ClientRect.top)
    }
  }

      
  function dibujar_figuras(dibujo, x1,x2,y1,y2,c_color, r_color, relleno){
    ctx.strokeStyle = c_color;
    if (relleno) {
      ctx.fillStyle = r_color;
    }
    ctx.beginPath();
    if (dibujo == "linea") {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    } else if (dibujo == "elipse"){
      var dx = Math.sqrt(Math.pow(x2-x1,2));
      var dy = Math.sqrt(Math.pow(y2-y1,2));
      ctx.ellipse(x1, y1,dx,dy,Math.PI / 4,0,2 * Math.PI);
        
    } else if (dibujo == "circulo"){
      var radio = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
      ctx.arc(x1, y1, radio, 0, 2 * Math.PI);
        
    } else if (dibujo == "rectangulo"){
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x1, y2);
      ctx.lineTo(x1, y1);
        
    } else if (dibujo == "cuadrado"){
      var distancia = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
      ctx.moveTo(x1, y1);
      if (x2 > x1 && y2 < y1) {
        ctx.lineTo(x1+distancia, y1); 
        ctx.lineTo(x1+distancia, y1-distancia); 
        ctx.lineTo(x1, y1-distancia); 
        ctx.lineTo(x1, y1); 
      } else if (x2 > x1 && y2 > y1) {
        ctx.lineTo(x1+distancia, y1); 
        ctx.lineTo(x1+distancia, y1+distancia); 
        ctx.lineTo(x1, y1+distancia); 
        ctx.lineTo(x1, y1); 
      } 
      else if (x2 < x1 && y2 > y1) {
        ctx.lineTo(x1-distancia, y1); 
        ctx.lineTo(x1-distancia, y1+distancia); 
        ctx.lineTo(x1, y1+distancia); 
        ctx.lineTo(x1, y1); 
      } 
      else if (x2 < x1 && y2 < y1) {
        ctx.lineTo(x1-distancia, y1); 
        ctx.lineTo(x1-distancia, y1-distancia); 
        ctx.lineTo(x1, y1-distancia); 
        ctx.lineTo(x1, y1); 
      }
    }
    if (relleno && dibujo != "linea") {
      ctx.fill();
    }
    ctx.stroke(); 
  }

  document.getElementById('save').addEventListener('click', () => {
    var canvasContents = canvas.toDataURL();
    var data = { image: canvasContents, date: Date.now() };
    var string = JSON.stringify(data);

    var file = new Blob([string], {
      type: 'application/json'
    });

    var a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'dibujo.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  document.getElementById('load').addEventListener('change', function() {
    if (this.files[0]) {
      reader.readAsText(this.files[0]);
    }
  });

  reader.onload = function() {
    var data = JSON.parse(reader.result);
    var image = new Image();
    image.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);
    }
    image.src = data.image;
  };

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