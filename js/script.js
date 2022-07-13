
/*================== Elementos del DOM y variables ==================*/

// elemento checkbox del DOM
const checkbox = document.getElementById("toggle");
let formato = false; // variable que establece el formato de la hora


//Array con los nombres de los meses de año
let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Array con los nombres de los días
let nombresDias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

//Array con los nombres de los id de los elementos del dom
let idsDOM = ["dia", "diaNum", "mes", "anio", "hora", "minutos", "segundos", "periodo"];

/*================== Funciones ==================*/

/* Función que obtiene la hora y fecha del sistema y obtenemos las diferentes partes que nos interesen */
let actualizarReloj = () => {
    let fecha = new Date();
    let nomDia = fecha.getDay();
    let mes = fecha.getMonth();
    let numDia = fecha.getDate();
    let year = fecha.getFullYear();
    let hora = fecha.getHours();
    let minuto = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let per;

    //Dependiendo de si esta marcado el checkbox o no, aplicaremos un formato.
    if(formato){
        if(hora == 0){
            hora = 12;
            per = "AM";
        }
        
        if(hora > 12){
            hora = hora - 12;
            per = "PM";
        }
    }else{
        per = "24h"
    }
    
    /* Array en el que guardamos los valores que queremos que se muestren en el DOM en el orden
     que deben mostrarse */
    let valores = [nombresDias[nomDia], formatoDigitos(numDia), meses[mes], year, formatoDigitos(hora), formatoDigitos(minuto), formatoDigitos(segundos), per];

    //recorremos los elementos del DOM y les aplicamos los valores a mostrar.
    for(let i = 0; i< idsDOM.length; i++){
        document.getElementById(idsDOM[i]).firstChild.nodeValue = valores[i];
    }
}

/*Función con la que ponemos los dígitos con dos cifras */
let formatoDigitos = (numero) => {
    if(numero < 10){
        numero = "0" + numero;
    }
    return numero;
}

/* Función que inicia el reloj y establece un intervalo de 1 segundo para que se actualice */
let iniciarReloj = () => {
    setInterval(() =>{
        actualizarReloj();
    }, 1000);
}

/*================== Eventos ==================*/

/* Evento con el que modificaremos el formato de la hora que se muestra */
checkbox.addEventListener("click", (event) =>{
    if(event.target.checked){
        formato = true;
    }else{
        formato = false;
    }
});

//evento que realiza el inicio del reloj cuando se termina de cargar la página.
window.addEventListener("load", iniciarReloj);