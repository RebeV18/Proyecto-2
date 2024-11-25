//Se declara arreglo para almacenar las encuestas
var encuestas = [];

//Función para agregar pregunta a encuesta
function agregarPregunta() {
    let interrogante = prompt("Ingresa la pregunta");

    let alternativas = [];
    let alt = 1;
    do{
        alt = parseInt(prompt("¿Cuántas alternativas tendrá la pregunta? \nFavor ingresar mínimo 2 alternativas."));
        if (alt <= 1){
            console.error("Favor ingresar mínimo 2 alternativas.");
        }
    } while (alt <= 1);

    for (let i = 0; i < alt; i++) {
        let alternativa = prompt("Ingresa la alternativa " + (i + 1));
        const existe = alternativas.some(alter => alter == alternativa);
        if(!existe){
            alternativas.push(alternativa);
        }
        else{
            console.error("La alternativa ya existe.");
        }
    }

    let respuestas = {};

    let pregunta = {
        interrogante, alternativas, respuestas
    };

    console.info("La pregunta ha sido creada.");
    return pregunta;
}

//Función para crear una encuesta
function crearEncuesta() {
    let encuesta = {};
    let nombreEncuesta = prompt("Ingresa el nombre de la encuesta");
    let existe = encuestas.some(encuesta => encuesta.nombreEncuesta == nombreEncuesta);
    if(!existe){
        let preguntas = [];
        let contador = 0;
        let op = 1;

        do {
            op = parseInt(prompt("Digita el número de tu elección: \n1 crear una pregunta \n2 eliminar una pregunta \n3 mostrar la encuesta \n0 volver al menú anterior"));
            switch (op) {
                case 0:
                    if (contador < 2) {
                        if (!confirm("Si la encuesta tiene menos de 8 preguntas no se guardará. \n¿Confirma que desea salir?")) {
                            op = 1;
                        }
                    }
                    else{
                        encuesta = {
                            nombreEncuesta, preguntas
                        };
                        encuestas.push(encuesta);
                    }
                    break;
                case 1:
                    const nuevaPregunta = agregarPregunta()
                    existe = preguntas.some(pregunta => pregunta.interrogante == nuevaPregunta.interrogante);
                    if (!existe){
                        preguntas.push(nuevaPregunta);
                        contador++;
                    }
                    else{
                        console.error("La pregunta ya existe.");
                        console.log(preguntas);
                    }
                    break;
                case 2:
                    const preg = prompt("Digite la pregunta que desea eliminar");
                    const index = preguntas.findIndex(p => p.interrogante === preg);
                    if (index >= 0) {
                        preguntas.splice(index, 1);
                        console.info("Pregunta eliminada");
                        contador--;
                    }
                    else {
                        console.error("Pregunta no encontrada");
                    }
                    break;
                case 3:
                    for (let i = 0; i < preguntas.length; i++) {
                        console.log(preguntas[i]);
                    }
                    break;
                default:
                    console.log("No elegiste una opción válida", op);
                    break;
            }
        } while (op != 0);
    }
    else{
        console.error("Ya existe una encuesta con ese nombre");
        mostrarEncuestas();
    }
}

//Función para mostrar los resultados de una encuesta.
const mostrarPreguntas = function (encuesta) {
    encuesta.preguntas.map((question) => console.log(question.interrogante));
}

//Función para mostrar los votos de una encuesta.
const mostrarVotos = function (encuesta) {
    encuesta.preguntas.forEach((pregunta) => {
        console.log(pregunta.respuestas);
    });
}

//Función para mostrar la encuesta, su nombre y las preguntas que contiene.
const mostrarEncuestas = function () {
    encuestas.forEach((encuesta) => {
        console.log(encuesta.nombreEncuesta);
        mostrarPreguntas(encuesta);
    });
}


//Función para preguntar al usuario sus votos y guardar las respuestas
function votar(ind){
    for (let i = 0; i < encuestas[ind].preguntas.length; i++) {
        respuesta = prompt(`${encuestas[ind].preguntas[i].interrogante} \nElige una de las siguientes opciones: \n${encuestas[ind].preguntas[i].alternativas}`);
        if (encuestas[ind].preguntas[i].alternativas.includes(respuesta)) {
            if (encuestas[ind].preguntas[i].respuestas[respuesta]) {
                encuestas[ind].preguntas[i].respuestas[respuesta]++;
            }
            else {
                encuestas[ind].preguntas[i].respuestas[respuesta] = 1;
            }
        }
        else {
            console.log("La opción digitada no es válida.");
        }
    }
}

//Función para escoger la encuesta que va a responder y llama a la función votar.
const responderEncuesta = () => {
    mostrarEncuestas();
    let elegida = prompt("Ingresa el nombre de la encuesta que vas a responder");
    const index = encuestas.findIndex(encuesta => encuesta.nombreEncuesta == elegida);
    if (index >= 0) {
        votar(index);
    }
    else {
        console.error("Encuesta no encontrada");
    }
}

// Función para mostrar los resultados de las encuestas
    const mostrarResultados = function () {
        encuestas.forEach((encuesta) => {
            console.log(`Encuesta: ${encuesta.nombreEncuesta}`);
            encuesta.preguntas.forEach((pregunta) => {
                console.log(`Pregunta: ${pregunta.interrogante}`);
                console.log('Respuestas:');
                for (const [respuesta, votos] of Object.entries(pregunta.respuestas)) {
                    console.log(`- ${respuesta}: ${votos} votos`);
                }
            });
        });
    }
    
let opcion = 1;
//Ciclo do/while para repetir hasta que el usuario decida salir.
do {
    opcion = parseInt(prompt("Digita el número de tu elección:\n1 crear una nueva encuesta \n2 votar en una encuesta \n3 ver resultados de las encuestas \n0 salir"));
    switch (opcion) {
        case 0:
            console.log("Salir");
            break;
        //Opción para crear una encuesta.
        case 1:
            crearEncuesta();
            break;
        //Opción para responder o votar en una encuesta.
        case 2:
            responderEncuesta();
            break;
        //Opción para mostrar los resultados de todas las encuestas
        case 3:
            mostrarResultados();
            break;
        default:
            console.log("No elegiste una opción válida");
            break;
    }
} while (opcion != 0);