let miEleccion = null;
let puntosMe = 0;
let puntosPc = 0;
let ronda = 0;
const maxRondas = 5;
const maxPuntos = 3;

const imagenes = document.querySelectorAll(".imagen");
const opciones = ["piedra", "papel", "tijera"];
const resultadoEleccion = document.getElementById("miEleccion");
const resultadoPc = document.getElementById("pcEleccion");
const resultadoRonda = document.getElementById("mensaje");
const resultadoFinal = document.getElementById("resFinal");
const contadorRonda = document.getElementById("contador_ronda");
const misPuntos = document.getElementById("misPuntos");
const pcPuntos = document.getElementById("pcPuntos");

imagenes.forEach((imagen) => {
  imagen.addEventListener("click", function () {
    imagenes.forEach((img) => img.classList.remove("seleccion"));
    this.classList.add("seleccion");
    miEleccion = this.id;
    resultadoEleccion.textContent = this.alt;
  });
});

const botonJugar = document.getElementById("jugar");
botonJugar.addEventListener("click", function () {
  if (!miEleccion) {
    alert("Por favor, selecciona tu opción primero.");
    return;
  }

  const eleccionPc = opciones[Math.floor(Math.random() * opciones.length)];
  const pcImagen = document.getElementById(eleccionPc); // Seleccionar la imagen correcta de la PC

  imagenes.forEach((img) => img.classList.remove("seleccion_compu"));
  pcImagen.classList.add("seleccion_compu");
  resultadoPc.textContent = pcImagen.alt;

  if (miEleccion === eleccionPc) {
    document.getElementById(miEleccion).classList.add("seleccion_ambos");
    pcImagen.classList.add("seleccion_ambos");
  }

  const ganador = quienGana(miEleccion, eleccionPc);

  if (ganador === "jugador") {
    puntosMe++;
    resultadoRonda.textContent = "Ganaste";
  } else if (ganador === "pc") {
    puntosPc++;
    resultadoRonda.textContent = "PC Ganó";
  } else {
    resultadoRonda.textContent = "Empate";
  }

  misPuntos.textContent = puntosMe;
  pcPuntos.textContent = puntosPc;

  ronda++;
  contadorRonda.textContent = `ROUND ${ronda}`;

  if (puntosMe === maxPuntos) {
    resultadoFinal.textContent = "¡Ganaste el juego!";
    botonJugar.disabled = true;
    return;
  } else if (puntosPc === maxPuntos) {
    resultadoFinal.textContent = "La PC ganó.";
    botonJugar.disabled = true;
    return;
  }

  if (ronda >= maxRondas) {
    if (puntosMe > puntosPc) {
      resultadoFinal.textContent = "¡Ganaste el juego!";
    } else if (puntosMe < puntosPc) {
      resultadoFinal.textContent = "La PC ganó.";
    } else {
      resultadoFinal.textContent = "Es un empate.";
    }
    botonJugar.disabled = true;
  }

  setTimeout(function () {
    imagenes.forEach((img) =>
      img.classList.remove("seleccion", "seleccion_compu", "seleccion_ambos")
    );
    resultadoEleccion.textContent = "---";
    resultadoPc.textContent = "---";
    resultadoRonda.textContent = "Elige tu opción:";
  }, 5000);
});

function quienGana(jugador, pc) {
  if (jugador === pc) return "empate";
  if (
    (jugador === "piedra" && pc === "tijera") ||
    (jugador === "papel" && pc === "piedra") ||
    (jugador === "tijera" && pc === "papel")
  ) {
    return "jugador";
  }
  return "pc";
}

document.getElementById("reiniciar").addEventListener("click", function () {
  location.reload();
});
