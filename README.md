# PROYECTO 2: Sistema de Votación en JavaScript

## Planteamiento
Desarrollarás un programa en JavaScript que permita a los usuarios crear encuestas, votar y ver los resultados aplicando comandos en terminal. Este programa se podrá ejecutar en el navegador, para visualizarse a través de la consola, enlazado a un archivo HTML.

## Requerimientos
- Permitir a los usuarios crear encuestas con opciones de respuesta.
- Permitir a los usuarios votar en las encuestas.
- Mostrar los resultados de las encuestas en tiempo real.
- Almacenar los datos de las encuestas y los votos en una variable.
- Implementar la solución utilizando programación orientada a objetos (POO) y programación funcional (PF).
- Las encuestas deben contener al menos 8 preguntas con opciones de respuesta.

## Solución explicada paso a paso (POO)
### 1. Se declara arreglo para almacenar las encuestas
    let encuestas = [];


### 2. Clase Pregunta
Se crea la clase Pregunta, objeto formado por una interrogante, un arreglo con las alternativas de respuesta y otro con las respuestas de los usuarios.
```javascript
    class Pregunta {
        constructor(interrogante, alternativas, respuestas) {
            this.interrogante = interrogante;
            this.alternativas = alternativas;
            this.respuestas = respuestas;
    }
```


Función para registrar el voto de los usuarios en el arreglo de respuestas de la pregunta.    
```javascript
        registrarVoto(respuesta){
            if (this.alternativas.includes(respuesta)) {
                this.respuestas[respuesta] = (this.respuestas[respuesta] || 0) + 1;
              }
              else {
                console.log("La opción seleccionada no es válida.");
              }
        }
```

```javascript
Función que retorna los votos para cada alternativa de la pregunta. 
        respuestasPreguntas(){
            return this.respuestas.map((respuesta) => (respuesta !== 0 ? respuesta : null));
        }
    }
```


### 3. Clase Encuesta
Se crea la clase encuesta, formada por nombre de la encuesta y un arreglo de preguntas. 
```javascript
    class Encuesta {
        constructor(nombre, preguntas) {
            this.nombre = nombre;
            this.preguntas = preguntas;
        }
```


Función para pedir al usuario que ingrese su voto y llama a la función registrarVoto de la clase Pregunta. 
```javascript
        votar(){
            for (let i = 0; i < this.preguntas.length; i++){
                let answer = prompt(`${this.preguntas[i].interrogante} \nElige una de las siguientes opciones: \n${this.preguntas[i].alternativas}`);
                this.preguntas[i].registrarVoto(answer);
            }
        }
```

Función para imprimir los resultados de la encuesta. 
```javascript    
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
```

Función para mostrar las interrogantes de las preguntas.  
```javascript    
    mostrarInterrogantes(){
            for (let i = 0; i < this.preguntas.length; i++){
                let question = this.preguntas[i].interrogante;
                console.log(question);
            }
        }
```


Función para imprimir el nombre de la encuesta
```javascript    
    imprimirNombre(){ 
            console.log(this.nombre);
        }
    }
```

### 4. Funciones 
Función para agregar una pregunta a la encuesta. Se definen 3 variables: interrogante para almacenar el texto con la interrogante de la encuesta; un arreglo alternativas para almacenar las alternativas de respuesta, alt para almacenar número de alternativas; y arreglo de respuestas para almacenar las respuestas de los usuarios.
Se utiliza bucle do/while para asegurar que el usuario defina al menos 2 alternativas. Y el bucle for para solicitar al usuario las alternativas y guardarlas.
Retorna la pregunta creada.
```javascript
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
```


Función para crear encuesta, con su nombre y llamando lasfunciones correspondientes para crear las preguntas.
```javascript
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
```

Función para mostrar las encuestas con su *nombre* y las preguntas que contiene usando el método *forEach*
```javascript
    const mostrarEncuestas = function () {
        encuestas.forEach((encuesta) => {
            console.log(encuesta.nombre);
            encuesta.mostrarInterrogantes();
        });
    }
```


Función para elegir la encuenta que el usuario quiere responder. Se usa el método *findIndex* para encontrar indice de la encuesta seleccionada.
```javascript
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
```


Función para mostrar los resultados de todas las encuestas por medio del método *forEach*
```javascript
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
```



### 5. Menú de opciones
Se declara variable *opcion* para almacenar elección del usuario.
```javascript
    let opcion = 1;
```

Se ocupa un buble *do/while* para repetir hasta que el usuario escoja opción de *salir*. Se usa un *switch* para ejecutar la opción elegida por el usuario. Las opciones disponibles son: crear encuesta, votar en una encuesta, ver resultados de las encuestas y salir.
```javascript
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
```



## Solución explicada paso a paso (PF)
### 1. Variables
Se declara arreglo para almacenar las encuestas como var global para usarla en todo el programa.
```javascript
    var encuestas = [];
```


### 2. Funciones para crear una encuesta.
Función para agregar una pregunta a la encuesta. Se definen 3 variables: *interrogante* para almacenar el texto con la interrogante de la encuesta; un arreglo *alternativas* para almacenar las alternativas de respuesta; y *respuestas* como objeto para almacenar las respuestas de los usuarios y contabilizarlas.
Se utiliza bucle *do/while* para asegurar que el usuario defina al menos 2 alternativas. Y el ciclo *for* para solicitar al usuario las alternativas y guardar las alternativas.
```javascript
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
```


Función para crear una encuesta.
Se declaran las variables que contiene cada encuesta: *nombreEncuesta* con el nombre de la encuesta y arreglo de preguntas.
Se usa la variable existe para evitar que se cree encuesta con mismo nombre; la variable *contador* para asegurar que la encuesta tenga al menos 8 preguntas.
Además se define la variable *op* para guardar la opción elegida por el usuario. Esta opción se ocupa dentro de un switch para ofrecer al usuario las opciones crear pregunta, eliminar pregunta, mostrar la encuesta y volver al menú anterior.
```javascript
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
```


### 3. Funciones para mostrar datos.
Función para mostrar las preguntas de una encuesta por medio del método *map*.
```javascript
    const mostrarPreguntas = function (encuesta) {
        encuesta.preguntas.map((question) => console.log(question.interrogante));
    }
```



Función para mostrar las respuestas o votos de cada pregunta de una encuesta por medio del método *forEach*.
```javascript
    const mostrarVotos = function (encuesta) {
        encuesta.preguntas.forEach((pregunta) => {
            console.log(pregunta.respuestas);
        });
    }
```

Función para mostrar una encuesta por medio del método *forEach*. Se llama a la función *mostrarPreguntas* para esto.
```javascript
    const mostrarEncuestas = function () {
        encuestas.forEach((encuesta) => {
            console.log(encuesta.nombreEncuesta);
            mostrarPreguntas(encuesta);
        });
    }
```


### 4. Funciones para que el usuario vote en una encuesta. 
Función para votar en una encuesta, recibe como parámetro el índice de la encuesta en la que el usuario quiere votar. Muestra la *interrogante*, le pide elegir una respuesta y almacena las respuestas del usuario en el objeto *Respuestas* de cada pregunta.
```javascript
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
```


Función para que el usuario escoja la encuesta que quiere responder y llama a la función *votar*.
```javascript
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
```


### 5. Mostrar Resultados
Función para mostrar los resultados de todas las encuestas por medio del método *forEach*.
```javascript    
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
```
    


### 6. Menú de opciones principal
Se define la variable *opcion* para almacenar elección del usuario.
```javascript
    let opcion = 1;
```


Buble *do/while* para repetir la solicitar al usuario que elija una opción y se repite hasta que elija la opción de *Salir*.
Dentro de ese ciclo se ocupa un *switch* para ejecutar la opción elegida por el usuario. Las opciones disponibles son: crear encuesta, votar en una encuesta, ver resultados de las encuestas y salir.
```javascript
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
```
