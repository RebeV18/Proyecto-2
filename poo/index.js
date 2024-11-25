//Arreglo para almacenar las encuestas
let encuestas = [];
 
//Clase pregunta, objeto formado por una interrogante, un arreglo con las alternativas de respuesta y otro con las respuestas de los usuarios.
class Pregunta {
    constructor(interrogante, alternativas, respuestas) {
        this.interrogante = interrogante;
        this.alternativas = alternativas;
        this.respuestas = respuestas;
    }

    //Función para registrar el voto de los usarios en el arreglo de respuestas.
    registrarVoto(respuesta){
        if (this.alternativas.includes(respuesta)) {
            this.respuestas[respuesta] = (this.respuestas[respuesta] || 0) + 1;
          }
          else {
            console.log("La opción seleccionada no es válida.");
          }
    }

    //Función que retorna los votos para cada alternativa de la pregunta.
    respuestasPreguntas(){
        return this.respuestas.map((respuesta) => (respuesta !== 0 ? respuesta : null));
    }
}
 
//Clase encuesta, objeto formado por nombre de la encuesta y un arreglo de preguntas.
class Encuesta {
    constructor(nombre, preguntas) {
        this.nombre = nombre;
        this.preguntas = preguntas;
    }

    //Función para pedir al usuario que ingrese su voto y llama a la función registrarVoto.
    votar(){
        for (let i = 0; i < this.preguntas.length; i++){
            let answer = prompt(`${this.preguntas[i].interrogante} \nElige una de las siguientes opciones: \n${this.preguntas[i].alternativas}`);
            this.preguntas[i].registrarVoto(answer);
        }
    }

    //Función para imprimir los resultados de las encuestas.
    resultados(){
        console.log("Respuestas");
        for (let i = 0; i < this.preguntas.length; i++){
            console.log(this.preguntas[i].interrogante);
            let resp = this.preguntas[i].respuestasPreguntas();
            if (resp !== null){
                console.log(resp);
            }
        }
    }

    //Función para mostrar las interrogantes de las preguntas
    mostrarInterrogantes(){
        for (let i = 0; i < this.preguntas.length; i++){
            let question = this.preguntas[i].interrogante;
            console.log(question);
        }
    }

    //Función para imprimir el nombre de la encuesta
    imprimirNombre(){ 
        console.log(this.nombre);
    }
}

//Función para agregar preguntas a la encuesta seleccionada.
function agregarPregunta() {
    let interrogante = prompt("Ingresa la pregunta");
    let alternativas = [];
    let alt = 1;
    do{
        alt = parseInt(prompt("¿Cuántas alternativas tendrá la pregunta? Favor ingresar mínimo 2 alternativas"));
        if (alt <= 1){
            console.error("Favor ingresar mínimo 2 alternativas");
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

    let respuestas = [];

    return new Pregunta(interrogante, alternativas, respuestas);
}

//Función para crear encuesta, con su nombre y llamando lasfunciones correspondientes para crear las preguntas.
function crearEncuesta() {
    let nombreE = prompt("Ingresa el nombre de la encuesta");
    let existe = encuestas.some(encuesta => encuesta.nombre == nombreE);
    if(!existe){
        let cantidadPreguntas = 0;
        let opcionI = 1;
        let preguntas = [];
        do {
            opcionI = parseInt(prompt("Digita el número de tu elección: \n1 crear una pregunta \n2 eliminar una pregunta \n3 mostrar la encuesta \n0 volver al menú anterior"));
            switch (opcionI) {
                case 0:
                    if (cantidadPreguntas < 2) {
                        if (!confirm("Si la encuesta tiene menos de 8 preguntas no se guardará. \n¿Confirma que desea salir?")) {
                            opcionI = 1;
                        }
                    }
                    else{
                        let nuevaEncuesta = new Encuesta(nombreE, preguntas);
                        encuestas.push(nuevaEncuesta);
                        console.info("Encuesta creada y guardada.");
                    }
                break;
                case 1:
                    const nuevaPregunta = agregarPregunta()
                    existe = preguntas.some(pregunta => pregunta.interrogante == nuevaPregunta.interrogante);
                    if (!existe){
                        preguntas.push(nuevaPregunta);
                        cantidadPreguntas++;
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
                        cantidadPreguntas--;
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
                    console.log("No elegiste una opción válida", opcionI);
                break;
            }
        } while (opcionI != 0);
    }
    else{
        console.error("Ya existe una encuesta con ese nombre");
        mostrarEncuestas();
    }
}

//Función para mostrar las encuestas con su nombre y las interrogantes que contiene
const mostrarEncuestas = function () {
    encuestas.forEach((encuesta) => {
        console.log(encuesta.nombre);
        encuesta.mostrarInterrogantes();
    });
}

//Función para elegir la encuenta que el usuario quiere responder
function elegirEncuesta (){
    mostrarEncuestas();
    let elegida = prompt("Digita el nombre de la encuesta seleccionada");
    const index = encuestas.findIndex(encuesta => encuesta.nombre == elegida);
    if (index >= 0) {
        return encuestas[index];
    }
    else {
        console.error("Encuesta no encontrada");
        return null;
    }
}

//Función para mostrar los resultados de todas las encuestas
const mostrarResultados = function () {
    encuestas.forEach((encuesta) => {
        console.log(`Encuesta: ${encuesta.nombre}`);
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
//Se crea ciclo do/while para repetir hasta que el usuario escoja opción de salir
do {
    opcion = parseInt(prompt("Digita el número de tu elección:\n1 crear una nueva encuesta \n2 votar en una encuesta \n3 ver resultados de las encuestas \n0 salir"));
    switch (opcion) {
        case 0:
            console.log("Salir");
            break;
        //Opción para crear encuesta
        case 1:
            crearEncuesta();
            break;
        //Opción para votar en una encuesta
        case 2:
            let votarEncuesta = elegirEncuesta();
            if (votarEncuesta !== null){
                votarEncuesta.votar();
                votarEncuesta.resultados();
            }
            break;
        //Opción para mostrar resultados de las opciones que llama a función correspondiente
        case 3:
                mostrarResultados();
            break;
        default:
            console.log("No elegiste una opción válida");
            break;
    }
} while (opcion != 0);