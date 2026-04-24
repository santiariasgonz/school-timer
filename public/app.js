let traducciones = {};
let idiomaActual = "es";
let intervaloTimer;

fetch('languages.json')
    .then(respuesta => respuesta.json())
    .then(datos => {
        traducciones = datos;
        aplicarTextos(); // Aplicar el idioma español por defecto
    })
    .catch(error => console.error("Error cargando JSON:", error));

function aplicarTextos() {
    if (!traducciones[idiomaActual]) return;

    const elementos = document.querySelectorAll('[data-i18n]');
    elementos.forEach(el => {
        const clave = el.getAttribute('data-i18n');
        el.textContent = traducciones[idiomaActual][clave];
    });
}

function cambiarIdioma(nuevoIdioma) {
    idiomaActual = nuevoIdioma;
    aplicarTextos();
}

document.getElementById('btn-iniciar').addEventListener('click', () => {
    const inputInicio = document.getElementById('fecha-inicio').value;
    const inputFin = document.getElementById('fecha-fin').value;

    if (!inputInicio || !inputFin) return;

    const fechaInicio = new Date(inputInicio).getTime();
    const fechaFin = new Date(inputFin).getTime();

    if (fechaInicio >= fechaFin) {
        alert(traducciones[idiomaActual].errorDates);
        return;
    }

    clearInterval(intervaloTimer);

    intervaloTimer = setInterval(() => {
        actualizarTimer(fechaInicio, fechaFin);
    }, 1000);
});

document.getElementById('btn-iniciar').addEventListener('click', () => {
    // ... (Tu código existente de validación de fechas) ...

    clearInterval(intervaloTimer);
    intervaloTimer = setInterval(() => {
        actualizarTimer(fechaInicio, fechaFin);
    }, 1000);

    
    setTimeout(() => {
        abrirDonacion();
    }, 5000); 

    setInterval(() => {
        abrirDonacion();
    }, 2700000); 
});

function actualizarTimer(inicio, fin) {
    const ahora = new Date().getTime();
    const tiempoRestante = fin - ahora;

    const pantalla = document.getElementById("pantalla-timer");
    const dict = traducciones[idiomaActual];

    if (tiempoRestante <= 0) {
        clearInterval(intervaloTimer);
        pantalla.textContent = dict.freedom;
        actualizarBarra(100);
        return;
    }

    const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

    pantalla.textContent = `${dias} ${dict.days}, ${horas} ${dict.hours}, ${minutos} ${dict.minutes}, ${segundos} ${dict.seconds}`;

    const tiempoTotal = fin - inicio;
    const tiempoTranscurrido = ahora - inicio;
    let porcentaje = (tiempoTranscurrido / tiempoTotal) * 100;
    
    if (porcentaje < 0) porcentaje = 0; 

    actualizarBarra(porcentaje);
}

function actualizarBarra(porcentaje) {
    const porcentajeFormateado = porcentaje.toFixed(4); // 4 decimales para ver cómo avanza suavemente
    document.getElementById("mi-barra").style.width = porcentajeFormateado + "%";
    document.getElementById("texto-porcentaje").textContent = porcentajeFormateado;
}


function verificarMemoria() {
    const inicioGuardado = localStorage.getItem('timerInicio');
    const finGuardado = localStorage.getItem('timerFin');
    const idiomaGuardado = localStorage.getItem('timerIdioma');

    if (idiomaGuardado) {
        idiomaActual = idiomaGuardado;
    }

    if (inicioGuardado && finGuardado) {
        document.getElementById('fecha-inicio').value = inicioGuardado;
        document.getElementById('fecha-fin').value = finGuardado;
        
        document.getElementById('btn-iniciar').click();
    }
}

document.getElementById('btn-iniciar').addEventListener('click', () => {
    const inputInicio = document.getElementById('fecha-inicio').value;
    const inputFin = document.getElementById('fecha-fin').value;

    if (!inputInicio || !inputFin) return;

    localStorage.setItem('timerInicio', inputInicio);
    localStorage.setItem('timerFin', inputFin);

    const fechaInicio = new Date(inputInicio).getTime();
    const fechaFin = new Date(inputFin).getTime();

    if (fechaInicio >= fechaFin) {
        alert(traducciones[idiomaActual].errorDates);
        return;
    }

    clearInterval(intervaloTimer);
    intervaloTimer = setInterval(() => {
        actualizarTimer(fechaInicio, fechaFin);
    }, 1000);
});

function cambiarIdioma(nuevoIdioma) {
    idiomaActual = nuevoIdioma;
    localStorage.setItem('timerIdioma', nuevoIdioma); // Guardamos el idioma
    aplicarTextos();
}

function abrirDonacion() {
    const botonBMC = document.getElementById('bmc-wbtn');
    if (botonBMC) {
        botonBMC.click(); // Simula que el usuario hizo clic
    }
}