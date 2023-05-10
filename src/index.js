/* El código está comprobando si la extensión del archivo es .sh. Si no es así, muestra un mensaje de
brindis y borra la entrada del archivo. */
CargarArchivos();
// // leerArchivo();
// crearTablaMemoria();

class Variable {
  #nombre;
  #tipo;
  #valor;

  get getValor() {
    return this.#valor;
  }
  get getNombre() {
    return this.#nombre;
  }

  get getTipo() {
    return this.#tipo;
  }
  set setValor(valor) {
    this.#valor = valor;
  }

  constructor(nombre, tipo, valor) {
    this.#nombre = nombre;
    this.#tipo = tipo;
    this.#valor = valor;
  }
}
class Etiqueta {
  #nombreE;
  #posicion;

  get getNombreE() {
    return this.#nombreE;
  }

  get getPosicion() {
    return this.#posicion;
  }

  constructor(nombreE, posicion) {
    this.#nombreE = nombreE;
    this.#posicion = posicion;
  }
}

let programasParaCorrer = new Array();
let espacioDisponible = 90;
let nombreProgamas = new Array();
let memoria = new Array();
let filas = new Array();
let progamasCorriendo = new Array();
let listaDeVariables = new Array();
let listaDeEtiquetas = new Array();
let acumulador = 0;
let totalParaMemoria = 0;
let indice = 0;
let pasoApaso = false;
let totalMemoria = 0;
let iteradorParaMemoria = 0;

memoria.push(acumulador);

/* Agregar detectores de eventos a los botones. */
document
  .getElementById("memoryInput")
  .addEventListener("change", crearTablaMemoria, false);

document.getElementById("Inicio").addEventListener("click", iniciarEjecucion);
document
  .getElementById("kernelInput")
  .addEventListener("change", asignarATablaKernel, false);

/**
 * Lee el archivo y lo empuja a una matriz
 */
function CargarArchivos() {
  const fileInput = document.getElementById("file-input");
  const toast = document.getElementById("toast");

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const extension = file.name.split(".").pop().toLowerCase();
    const leector = new FileReader();

    leector.onload = function (event) {
      /* Leyendo el archivo. */
      const contenido = event.target.result;
      /* Está dividiendo el contenido del archivo en una matriz de cadenas. */
      filas = contenido.split(/\r?\n|\r/);
      /* Está empujando el contenido del archivo a una matriz. */
      programasParaCorrer.push(filas);
      // document.getElementById("KernelInput").setAttribute("hidden", "");
      // document.getElementById("MemoryInput").setAttribute("hidden", "");
      espacioDisponible =
        document.getElementById("MemoryInput").value -
        document.getElementById("KernelInput").value;

      if (filas.length > espacioDisponible) {
        alert("No hay espacio disponible");
        return;
      }
    };
    leector.readAsText(file);
    nombreProgamas.push(file.name);

    if (extension !== "ch") {
      // Mostrar toast de error
      toast.style.display = "flex";
      setTimeout(() => {
        toast.style.display = "none";
      }, 3000);
      return null;
    }
    if (extension == null) {
      return null;
    }

    // Limpiar el valor del input de archivo
    //fileInput.value = "";
    else {
      alert("Archivo de entrada correcto.");
    }
  });
}

/**
 * Crea una tabla con la capacidad de memoria que el usuario ha ingresado
 */
function crearTablaMemoria() {
  let tablaMemoria = document.getElementById("memoria");
  let cuerpoTabla = document.createElement("tbody");
  let capacidadTotalM = document.getElementById("memoryInput").value; //Capacidad total de la memoria

  for (
    totalParaMemoria;
    totalParaMemoria < Number(capacidadTotalM);
    totalParaMemoria++
  ) {
    let fila = document.createElement("tr");
    let celda = document.createElement("td");

    celda.innerText = totalParaMemoria;
    fila.appendChild(celda);

    celda = document.createElement("td");
    celda.setAttribute("id", totalParaMemoria);
    fila.appendChild(celda);

    cuerpoTabla.appendChild(fila);
  }
  tablaMemoria.appendChild(cuerpoTabla);
}

/**
 * Crea una tabla con las variables y sus posiciones.
 */
function crearTablaVariables() {
  let tablaVariable = document.getElementById("tabla_variables");
  let cuerpoTabla = document.createElement("tbody");

  for (pos = 0; pos < listaDeVariables.length; pos++) {
    //Si la posicion actual es menor que la posicion total lista de variables
    let fila = document.createElement("tr");
    let celda = document.createElement("td");

    celda.innerText = buscarPosicionVariable(listaDeVariables[pos - 1]); //ingresa en la celda el texto de la posicion de la variable
    fila.appendChild(celda); //ingresa en la fila la celda

    celda = document.createElement("td");
    celda.innerText = listaDeVariables[pos].getNombre;
    fila.appendChild(celda);

    cuerpoTabla.appendChild(fila);
  }
  tablaVariable.appendChild(cuerpoTabla);
}

/**
 * Devuelve la posición de una variable en la memoria.
 * @param objetoVariable - La variable de la que desea encontrar la posición.
 * @returns La posición de la variable en la memoria.
 */
function buscarPosicionVariable(objetoVariable) {
  let posicion = 0;
  for (i = 0; i < memoria.length; i++) {
    posicion += 1;
    if (objetoVariable === memoria[i]) {
      return posicion;
    }
  }
}

/**
 * Crea una tabla con las etiquetas y sus respectivas posiciones.
 */
function crearTablaEtiquetas() {
  let tablaEtiqueta = document.getElementById("tabla_etiquetas");
  let cuerpoTabla = document.createElement("tbody");

  for (pos = 0; pos < listaDeEtiquetas.length; pos++) {
    let fila = document.createElement("tr");
    let celda = document.createElement("td");

    celda.innerText = buscarPosicionEtiqueta(listaDeEtiquetas[pos - 1]);
    fila.appendChild(celda);

    celda = document.createElement("td");
    celda.innerText = listaDeEtiquetas[pos].getNombreEtiqueta;
    fila.appendChild(celda);

    cuerpoTabla.appendChild(fila);
  }
  tablaEtiqueta.appendChild(cuerpoTabla);
}

/**
 * Toma un objeto como argumento y devuelve la posición de ese objeto en la matriz
 * @param objetoEtiqueta - La etiqueta que desea encontrar.
 * @returns la posición del objeto en la matriz.
 */
function buscarPosicionEtiqueta(objetoEtiqueta) {
  let posicion = 0;
  for (i = 0; i < memoria.length; i++) {
    posicion += 1;
    if (objetoEtiqueta === memoria[i]) {
      return posicion;
    }
  }
}

/**
 * Lee el archivo línea por línea y ejecuta las operaciones.
 * @param filas - las lineas del archivo
 * @param indice - es el índice de la línea que se está ejecutando
 * @returns el valor de la variable "resultado"
 */
function operaciones(filas, indice) {
  for (indice; indice < filas.length; indice++) {
    let linea = filas[indice].split(" ");
    let palabraClave = linea[0]; //lee la posicion de las filas en 0 del archivo para ejecutar las operaciones
    palabraClave = palabraClave.toLowerCase();

    switch (palabraClave) {
      case "cargue":
        cargue(linea[1]);
        break;
      case "almacene":
        almacene(linea[1]);
        break;
      case "lea":
        lea(linea[1]);
        break;
      case "sume":
        sume(linea[1]);
        break;
      case "reste":
        reste(linea[1]);
        break;
      case "multiplique":
        multiplique(linea[1]);
        break;
      case "divida":
        divida(linea[1]);
        break;
      case "potencia":
        potencia(linea[1]);
        break;
      case "modulo":
        modulo(linea[1]);
        break;
      case "concatene":
        concatene(linea[1]);
        break;
      case "elimine":
        elimine(linea[1]);
        break;
      case "extraiga":
        extraiga(linea[1]);
        break;
      case "y":
        y(linea);
        break;
      case "o":
        o(linea);
        break;
      case "no":
        no(linea);
        break;
      case "muestre":
        muestre(linea);
        break;
      case "imprima":
        imprima(linea);
        break;
      case "retorne":
        retorne();
        return;
      case "vaya":
        vaya(linea[1]);
        break;
      case "vayasi":
        indice = vayasi(linea) - 1;
        break;
      case "xxx":
        if (pasoApaso == 1) {
          alert("Solo te alerta");
        }
        XXX();
        break;
      default:
        break;
    }
  }
}

//Funciones
/*Asigna al acumulador la variable que encuentre con el nombre que se le pase */
function cargue(nombreVariable) {
  if (pasoApaso === true) {
    alert("Se carga la variable al acumulador");
  }
  for (i = 0; i < listaDeVariables.length; i++) {
    if (nombreVariable === listaDeVariables[i].getNombre) {
      //busca en la lista de variables el nombre de la variable

      acumulador = listaDeVariables[i].getValor; //toma el valor de la variable
      document.getElementById("acumulador_text").innerText = acumulador; //llama a la clase acumulador del html
      memoria[0] = acumulador; //guada en memoria el valor del acumulador
      document.getElementById("0").innerText = "acumulador = " + acumulador; //imprime el valor del acumulador
      return;
    }
  }
}

/**
 *
 * Guarda en la varible indicada el valor que haya en el acumulador
 */
function almacene(nombreVariable) {
  if (pasoApaso === true) {
    alert("Guarda el valor que hay en el acumulador en la variable");
  }
  for (i = 0; i < listaDeVariables.length; i++) {
    if (nombreVariable === listaDeVariables[i].getNombre) {
      listaDeVariables[i].setValor = acumulador; //guarda el valor del acumulador en la variable
      return;
    }
  }
}

/**
 *
 * lee un valor ingresado por el usuario y lo asigna a la variable indicada
 */
function lea(nombreVariable) {
  if (pasoApaso === true) {
    alert("lee la entraba y se la asigna a una variable");
  }
  let newVariable = parseInt(
    prompt("Ingrese el valor para la nueva variable: ")
  );
  for (i = 0; i < listaDeVariables.length; i++) {
    if (nombreVariable === listaDeVariables[i].getNombre) {
      listaDeVariables[i].setValor = newVariable;
      return;
    }
  }
}

/**
 * Comprueba si una palabra es una palabra clave
 * @param palabra - La palabra a revisar.
 */
function esPalabraClave(palabra) {
  let palabra_clave = new Array();
  palabra_clave = [
    "cargue",
    "pare",
    "itere",
    "almacene",
    "nueva",
    "lea",
    "sume",
    "reste",
    "multiplique",
    "divida",
    "potencia",
    "modulo",
    "concatene",
    "elimine",
    "extraiga",
    "Y",
    "y",
    "o",
    "O",
    "no",
    "NO",
    "muestre",
    "imprima",
    "vaya",
    "vayasi",
    "etiqueta",
    "xxx",
    "retorne",
  ];

  for (indice = 0; indice < palabra_clave.length; indice++) {
    if (palabra != palabra_clave[indice]) {
      return false;
    }
  }

  return true;
}

/**
 * Comprueba si la primera palabra de cada línea es una palabra clave, si lo es, devuelve un error.
 * @param filas - una matriz de cadenas
 * @returns el valor de la variable error.
 */
function chequearSintaxis(filas) {
  let error = false;

  for (let i = 0; i < filas.length; i++) {
    let palabra = filas[i].split("");
    console.log("palabra[0] = " + palabra[0]);

    if (esPalabraClave(palabra[0])) {
      alert("La palabra " + palabra[0] + " no es valida");
      error = true;
    } else if (
      palabra[0] == null ||
      palabra[0] == "" ||
      palabra[0] == "//" ||
      palabra[0] == " "
    ) {
      return error;
    } else {
      return error;
    }
    return error;
  }
}

/**
 * Toma el valor del campo de entrada y lo asigna a la variable espacioKernel. Luego, crea un bucle for
 * que itera tantas veces como el valor de espacioKernel. Cada iteración crea una nueva celda en la
 * tabla y le asigna el valor de "***Asignado***"
 */
function asignarATablaKernel() {
  let espacioKernel = document.getElementById("kernelInput").value;
  for (i = 1; i <= Number(espacioKernel); i++) {
    let celda = document.getElementById(i);
    celda.innerHTML = "***Asignado***";
    iteradorParaMemoria += 1;
    memoria.push("***Asignado***");
  }
}

/**
 * Toma una matriz de datos y la empuja a otras dos matrices
 * @param datos - Matriz de objetos que contienen las siguientes propiedades:
 */
function asignarDatosMemoria(datos) {
  for (elementos = 0; elementos < datos.length; elementos++) {
    memoria.push(datos[elementos]);
  }
  for (elementos = 0; elementos < datos.length; elementos++) {
    progamasCorriendo.push(datos[elementos]);
  }
}

/**
 * Toma una matriz de cadenas y, dependiendo de la primera palabra de cada cadena, creará una nueva
 * variable o una nueva etiqueta.
 * @param filas - es una matriz de cadenas, cada cadena es una línea de código.
 */
function variableYEtiquetas(filas) {
  for (items = 0; items < filas.length; items++) {
    let linea = filas[items].split(" "); // guarda en la variable linea, los elementos de las filas
    switch (linea[0]) {
      case "nueva":
        nueva(linea);
        break;
      case "etiqueta":
        etiqueta(linea);
        break;
    }
  }

  crearTablaVariables();
  crearTablaEtiquetas();

  operaciones(filas, indice);

  for (item = iteradorParaMemoria; item < memoria.length; item++) {
    let celda = document.getElementById(item); //coloca en las celdas las etquetas y variables
    if (memoria[item] instanceof Variable) {
      celda.innerText = memoria[item].getNombre; //coloca el Nombre del proceso
    } else if (memoria[item] instanceof Etiqueta) {
      celda.innerText = memoria[item].getNombreEtiqueta; //coloca el nombre de la memoria
    } else {
      celda.innerText = memoria[item];
    }
    iteradorParaMemoria += 1;
  }
}
/**
 * Crea una nueva etiqueta.
 * @param linea - la línea de código que se está leyendo
 */
function etiqueta(linea) {
  if (pasoApaso === true) {
    alert("Se crea una nueva Etiqueta");
  }
  let etiqueta = new Etiqueta(linea[1], linea[2]); //guarda los valores que tiene la linea
  memoria.push(etiqueta);
  listaDeEtiquetas.push(etiqueta);
}

/**
 * Crea una nueva variable y la almacena en memoria.
 * @param linea - La línea de código que se está ejecutando.
 */
function nueva(linea) {
  if (pasoApaso === true) {
    alert("Se crea una nueva variable");
  }
  let nuevaVariable;
  let tipo = linea[2];
  switch (linea.length) {
    case 3:
      if (tipo === "I" || tipo === "R" || tipo === "L") {
        nuevaVariable = new Variable(linea[1], tipo, 0);
      } else if (tipo === "C") {
        nuevaVariable = new Variable(linea[1], tipo, "");
      } else {
        return;
      }
      memoria.push(nuevaVariable); //Guarda en la memoria una nueva variable
      listaDeVariables.push(nuevaVariable); //Guarda en la lista de variables
      break;
    case 4:
      if (tipo === "I" || tipo === "R" || tipo === "L") {
        nuevaVariable = new Variable(linea[1], tipo, Number(linea[3]));
      } else {
        nuevaVariable = new Variable(linea[1], tipo, linea[3]);
      }
      memoria.push(nuevaVariable);
      listaDeVariables.push(nuevaVariable);
      break;
    default: //crea una variable con los parametros de la linea en posicion 1 (Nombre), tipo ,valor
      //guarda en memoria la variable
      //guarda en lista de variable los valores de las nuevas variables
      nuevaVariable = new Variable(linea[1], tipo, linea[3]);
      for (i = 4; i < linea.length; i++) {
        nuevaVariable.setValor = nuevaVariable.getValor
          .concat(" ")
          .concat(linea[i]); //Concatena y guarda el valor en la variable
      }
      memoria.push(nuevaVariable);
      listaDeVariables.push(nuevaVariable);
      break;
  }
}

/**
 * Toma los programas para ejecutarse, verifica su sintaxis, los asigna a la memoria y luego asigna
 * variables y etiquetas.
 * @returns el valor de la variable "resultado"
 */
function iniciarEjecucion() {
  for (i = 0; i < programasParaCorrer.length; i++) {
    filas = programasParaCorrer[i];
    if (chequearSintaxis(filas)) {
      alert("La sintaxis no es valida");
      return;
    }
    if (filas.length > espacioDisponible) {
      alert("No hay espacio disponible");
      return;
    }
    asignarDatosMemoria(filas);
    variableYEtiquetas(filas);
  }
}
/**
 * La función "imprime" imprime el valor de una variable seleccionada o el acumulador.
 * @param linea - Es un parámetro de la función `imprima()`. Es probable que sea una matriz que
 * contenga el comando para imprimir una variable o el valor del acumulador. El primer elemento del
 * arreglo puede ser la palabra clave "imprima" y el segundo elemento puede ser el nombre de la
 * variable a imprimir o
 * @returns nada (indefinido). Está utilizando la instrucción `return` para salir del bucle y detener
 * la ejecución de la función, pero no devuelve ningún valor.
 */

function imprima(linea) {
  if (pasoApaso == 1) {
    alert("Se imprime el valor de la variable seleccionada");
  }
  let texto = "";
  for (i = 0; i < listaDeVariables.length; i++) {
    if (linea[1] === listaDeVariables[i].getNombre) {
      texto = document.getElementById("impresora").textContent;
      texto +=
        '\nLa variable: "' +
        listaDeVariables[i].getNombre +
        '" tiene valor de: "' +
        listaDeVariables[i].getValor +
        '"\n';
      document.getElementById("impresora").innerHTML = texto;
      return;
    } else if (linea[1] === "acumulador") {
      texto = document.getElementById("impresora").textContent;
      texto += '\nAcumulador: "' + acumulador + '"\n';
      document.getElementById("impresora").innerHTML = texto;
      return;
    }
  }
}

/**
 * La función suma el valor de una variable especificada a un acumulador.
 * @param nombreVariable - El parámetro "nombreVariable" es una variable que representa el nombre de la
 * variable cuyo valor se quiere sumar al acumulador.
 * @returns nada (indefinido). Solo actualiza el valor del acumulador y lo muestra en la página web.
 */
function sume(nombreVariable) {
  if (pasoApaso === true) {
    alert("Adiciona al acumulador el valor que haya en la variable");
  }
  for (i = 0; i < listaDeVariables.length; i++) {
    if (nombreVariable === listaDeVariables[i].getNombre) {
      acumulador = acumulador + listaDeVariables[i].getValor;
      document.getElementById("acumulador_text").innerText = acumulador;
      document.getElementById("0").innerText = "acumulador = " + acumulador;
      return;
    }
  }
}

/* El código anterior define una función llamada "reste" que toma un parámetro llamado
"nombreVariable". La función comprueba si una variable llamada "pasoApaso" es verdadera y muestra un
mensaje de alerta si lo es. Luego recorre una matriz llamada "listaDeVariables" para encontrar la
variable con el mismo nombre que el parámetro pasado. Si encuentra una coincidencia, resta el valor
de esa variable de una variable llamada "acumulador", actualiza el contenido de texto de dos
elementos HTML con el nuevo valor de "acumulador", registra el nuevo valor en la consola */
function reste(nombreVariable) {
  if (pasoApaso === true) {
    alert("Resta el valor del acumulador el valor de la variable");
  }
  for (i = 0; i < listaDeVariables.length; i++) {
    if (nombreVariable === listaDeVariables[i].getNombre) {
      acumulador = acumulador - listaDeVariables[i].getValor; //resta el valor del acumulador con el valor de la variable
      document.getElementById("acumulador_text").innerText = acumulador;
      document.getElementById("0").innerText = "acumulador = " + acumulador;
      console.log(acumulador);
      return;
    }
  }
}

/**
 * La función multiplica el valor de una variable dada al acumulador.
 * @param nombreVariable - El nombre de la variable que necesita ser multiplicada con el acumulador.
 * @returns nada (indefinido).
 */
/* El código anterior define una función llamada "multiplique" que toma un parámetro llamado
"nombreVariable". Sin embargo, el cuerpo de la función no se proporciona y, en su lugar, se
reemplaza con el marcador de posición " */
function multiplique(nombreVariable) {
  if (pasoApaso === true) {
    alert("multiplica al acumulador por el valor que haya en la variable");
  }
  for (i = 0; i < listaDeVariables.length; i++) {
    if (nombreVariable === listaDeVariables[i].getNombre) {
      acumulador = acumulador * listaDeVariables[i].getValor;
      document.getElementById("acumulador_text").innerText = acumulador;
      document.getElementById("0").innerText = "acumulador = " + acumulador;
      return;
    }
  }
}

/**
 * La función divide el acumulador por el valor de una variable especificada en una lista de variables.
 * @param nombreVariable - El parámetro "nombreVariable" es una cadena que representa el nombre de una
 * variable que utilizará la función para dividir el acumulador por su valor.
 * @returns nada (indefinido).
 */
function divida(nombreVariable) {
  if (pasoApaso === true) {
    alert("divide al acumulador por el valor que haya en la variable");
  }
  for (i = 0; i < listaDeVariables.length; i++) {
    if (nombreVariable === listaDeVariables[i].getNombre) {
      if (memoria[i].getValor != 0) {
        acumulador = acumulador / listaDeVariables[i].getValor;
        document.getElementById("acumulador_text").innerText = acumulador;
        document.getElementById("0").innerText = "acumulador = " + acumulador;
        return;
      }
    }
  }
}
