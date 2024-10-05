let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

window.onload = function () {
  base_preguntas = readText("bdpreguntas.json");
  interprete_bp = JSON.parse(base_preguntas);
  escogerPreguntaAleatoria();
};

let pregunta;
let posibles_respuestas;
btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3")
];
let npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;

function escogerPreguntaAleatoria() {
  let n;
  if (preguntas_aleatorias) {
    n = Math.floor(Math.random() * interprete_bp.length);
  } else {
    n = 0;
  }

  while (npreguntas.includes(n)) {
    n++;
    if (n >= interprete_bp.length) {
      n = 0;
    }
    if (npreguntas.length == interprete_bp.length) {
      if (mostrar_pantalla_juego_términado) {
        swal.fire({
          title: "Juego finalizado",
          text:
            "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas),
          icon: "success"
        });
      }
      if (reiniciar_puntos_al_reiniciar_el_juego) {
        preguntas_correctas = 0
        preguntas_hechas = 0
      }
      npreguntas = [];
    }
  }
  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);
}

function escogerPregunta(n) {
  pregunta = interprete_bp[n];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("puntaje").innerHTML = "¡DIVERTITE JUGANDO!";

  
  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta);
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "200px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }
}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  for (let i = 0; i < btn_correspondiente.length; i++) {
    let img = document.createElement("img");
    img.src = posibles_respuestas[i];
    img.alt = "Opción " + (i + 1);
    img.style.width = "450px"; 
    img.style.height = "65px"; 
    img.style.display = "block"; 
    img.style.margin = "0 auto"; 
    btn_correspondiente[i].innerHTML = ""; 
    btn_correspondiente[i].appendChild(img); 
  }
}

let suspender_botones = false;

function oprimir_btn(i) {
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  if (posibles_respuestas[i] == pregunta.respuesta) {
    preguntas_correctas++;
    btn_correspondiente[i].style.background = "#77dd77";
  } else {
    btn_correspondiente[i].style.background = "#ff6961";
  }
  for (let j = 0; j < 5; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "lightgreen";
      break;
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 2000);
}


function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white";
  }
  escogerPreguntaAleatoria();
}

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}