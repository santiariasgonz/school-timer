 navigator.geolocation.getCurrentPosition(function(position) {
  // Handle the retrieved position data
 });

 navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Lat:", position.coords.latitude);
  },
  (error) => {
    console.warn("No se pudo obtener la ubicación. Usando configuración por defecto.");
    }
);

 function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    // Inyectamos el texto correspondiente en el DOM
    element.textContent = translations[lang][key];
  });
}
setLanguage('en');

const finDeSemestre = new Date("2024-12-20T15:00:00-06:00");

function calcularTiempoRestante() {
  const ahora = new Date(); 
  
  const diferencia = finDeSemestre - ahora; 

  if (diferencia <= 0) {
    return "¡Eres libre!";
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / 1000 / 60) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  return { dias, horas, minutos, segundos };
}

function calcularProgreso(inicio, fin) {
  const ahora = new Date();
  
  const tiempoTotal = fin - inicio;
  
  const tiempoTranscurrido = ahora - inicio;

  let porcentaje = (tiempoTranscurrido / tiempoTotal) * 100;
  
  if (porcentaje > 100) porcentaje = 100;
  if (porcentaje < 0) porcentaje = 0;

  return porcentaje.toFixed(2); 
}

let idiomaActual = "en"; 


function actualizarPantalla(dias, horas, minutos, segundos) {

  const dict = translations[idiomaActual]; 
  const textoFinal = `${dias} ${dict.days}, ${horas} ${dict.hours}, ${minutos} ${dict.minutes}, y ${segundos} ${dict.seconds}`;

  document.getElementById("pantalla-timer").textContent = textoFinal;
}

setInterval(() => {
  const tiempo = calcularTiempoRestante(fechaInicio, fechaFin);
  
  if (tiempo === "¡Eres libre!") {
    document.getElementById("pantalla-timer").textContent = translations[idiomaActual].message;
  } else {
    // Le pasamos los números a nuestra función bilingüe
    actualizarPantalla(tiempo.dias, tiempo.horas, tiempo.minutos, tiempo.segundos);
  }
}, 1000);