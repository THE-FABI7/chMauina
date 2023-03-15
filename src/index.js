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

memoria.push(acumulador);

document
  .getElementById("memoryInput")
  .addEventListener("change", crearTablaMemoria, false);
// document
//   .getElementById("kernelInput")
//   .addEventListener("change", asignarATablaKernel, false);

/**
 * Lee el archivo y lo empuja a una matriz
 */
function CargarArchivos() {
  const fileInput = document.getElementById("file-input");
  const toast = document.getElementById("toast");

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const extension = file.name.split(".").pop().toLowerCase();
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

    programasParaCorrer.push(filas);
    // document.getElementById("KernelInput").setAttribute("hidden", "");
    document.getElementById("MemoryInput").setAttribute("hidden", "");
    espacioDisponible =
      document.getElementById("MemoryInput").value -
      document.getElementById("KernelInput").value;

    if (filas.length > espacioDisponible) {
      alert("No hay espacio disponible");
      return;
    }

    leector.readAsText(archivo);
    nombreProgamas.push(archivo.name);
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
