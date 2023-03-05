/* El código está comprobando si la extensión del archivo es .sh. Si no es así, muestra un mensaje de
brindis y borra la entrada del archivo. */
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
    // Limpiar el valor del input de archivo
    fileInput.value = "";
  } else {
    alert("Archivo de entrada correcto.");
  }
});

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
  #nombreE
  #posicion

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
