// Cada pregunta tiene opciones y el índice de la respuesta correcta.
// Los índices empiezan en 0: primera opción = 0, segunda = 1, tercera = 2.
const preguntas = [
  {
    texto:
      "¿Qué componente realiza el procesamiento principal de instrucciones?",
    opciones: ["Monitor", "Procesador", "Teclado"],
    correcta: 1,
  },
  {
    texto: "¿Cuál es un dispositivo de entrada?",
    opciones: ["Teclado", "Impresora", "Parlante"],
    correcta: 0,
  },
  {
    texto: "¿Qué significa CPU?",
    opciones: [
      "Unidad Central de Procesamiento",
      "Control Principal Universal",
      "Centro de Programas Únicos",
    ],
    correcta: 0,
  },
  {
    texto: "¿Cuál de estos es un lenguaje de programación?",
    opciones: ["Windows", "Python", "Chrome"],
    correcta: 1,
  },
  {
    texto: "¿Para qué sirve la memoria RAM?",
    opciones: [
      "Almacenar temporalmente datos en uso",
      "Imprimir documentos",
      "Conectar el mouse",
    ],
    correcta: 0,
  },
];

let preguntaActual = 0;
let puntos = 0;

// Conectamos JavaScript con los elementos del HTML.
const progreso = document.getElementById("progreso");
const pregunta = document.getElementById("pregunta");
const opciones = document.getElementById("opciones");
const mensaje = document.getElementById("mensaje");
const puntaje = document.getElementById("puntaje");
const siguiente = document.getElementById("siguiente");
const reiniciar = document.getElementById("reiniciar");

function mostrarPregunta() {
  const actual = preguntas[preguntaActual];

  progreso.textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
  pregunta.textContent = actual.texto;
  puntaje.textContent = `Puntaje: ${puntos}`;
  mensaje.textContent = "";
  opciones.innerHTML = "";
  siguiente.hidden = true;
  reiniciar.hidden = true;

  // Creamos un botón para cada opción.
  actual.opciones.forEach((texto, indice) => {
    const boton = document.createElement("button");
    boton.textContent = texto;

    boton.addEventListener("click", () => {
      comprobarRespuesta(indice);
    });

    opciones.appendChild(boton);
  });
}

function comprobarRespuesta(indiceElegido) {
  const actual = preguntas[preguntaActual];

  // Desactivamos las opciones para responder una sola vez.
  opciones.querySelectorAll("button").forEach((boton) => {
    boton.disabled = true;
  });

  if (indiceElegido === actual.correcta) {
    puntos++;
    mensaje.textContent = "¡Respuesta correcta!";
    mensaje.style.color = "#16733c";
  } else {
    mensaje.textContent = `Respuesta incorrecta. La correcta es: ${actual.opciones[actual.correcta]}`;
    mensaje.style.color = "#b42318";
  }

  puntaje.textContent = `Puntaje: ${puntos}`;
  siguiente.textContent =
    preguntaActual === preguntas.length - 1
      ? "Ver resultado"
      : "Siguiente pregunta";
  siguiente.hidden = false;
}

siguiente.addEventListener("click", () => {
  preguntaActual++;

  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
});

function mostrarResultado() {
  progreso.textContent = "Juego terminado";
  pregunta.textContent = "¡Terminaste la trivia!";
  opciones.innerHTML = "";
  mensaje.textContent = "";
  puntaje.textContent = `Respondiste correctamente ${puntos} de ${preguntas.length} preguntas.`;
  siguiente.hidden = true;
  reiniciar.hidden = false;
}

reiniciar.addEventListener("click", () => {
  preguntaActual = 0;
  puntos = 0;
  mostrarPregunta();
});

// Iniciamos el juego.
mostrarPregunta();
