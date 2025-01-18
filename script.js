// Seleccionar los elementos clave

const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");

// Variables para guardar los valores y el operador
let currentInput = ""; // Valor actual que el usuario escribe 
let previousInput = ""; // Valor anterior para calcular
let operador = null; // Operador actual (+, -, *, /)
let operationDisplay = ""; // Registro de la operación visible en pantalla

// Funcion para manejar clics en botones 
buttons.forEach(button => {    // Iteramos sobre todos los botones con la clase btn y les asignamos un evento click.
    button.addEventListener("click", () => {
        const action = button.getAttribute("data-action"); //Obtenemos el valor del atributo data-action (por ejemplo, add, subtract, etc.).
        const number = button.getAttribute("data-number"); //Obtenemos el valor del atributo data-number (números del 0 al 9).
    
        // Si es un numero, agregarlo a la entrada actual
        if (number !== null) {
            handNumber(number);
        }

        // Si es una accion (operador, limpiar, igual, retroceso)
        if (action !== null) {
            handleAction(action);

        }
    });
});

// Funcion para manejar numeros
function handNumber(number) {
    if (currentInput.length < 12) { //Limitamos el número de dígitos que se pueden ingresar para evitar desbordes en la pantalla.
        currentInput += number; // Agregar el numero al valor actual
        operationDisplay += number; // Agregar el número a la operación visible
        updateScreen(operationDisplay); // Actualizar la pantalla
    }
}

// Funcion para manejar acciones
function handleAction(action) {
    switch (action) {
        case "clear":
            currentInput = "";
            previousInput = "";
            operator = null;
            operationDisplay = ""; // Limpiar también la operación visible
            updateScreen("0");
            break;
        case "add":
        case "subtract":
        case "multiply":
        case "divide":
            if (currentInput === "") return; // Evitar errores
            if (previousInput !== "" && operator !== null) {
                currentInput = calculate(previousInput, currentInput, operator);
                updateScreen(currentInput);
            }
            operator = action; // Guardar el operador actual
            previousInput = currentInput; // Mover el número actual al previo
            currentInput = ""; // Limpiar la entrada actual
            operationDisplay += ` ${getOperatorSymbol(action)} `; // Mostrar el operador
            updateScreen(operationDisplay); // Actualizar la pantalla con la operación visible
            break;
        case "equals":
            if (operator && previousInput !== "" && currentInput !== "") {
                currentInput = calculate(previousInput, currentInput, operator);
                operator = null;
                previousInput = "";
                operationDisplay = currentInput; // Mostrar el resultado en la pantalla
                updateScreen(currentInput);
            }
            break;
        case "decimal":
            if (!currentInput.includes(".")) {
                currentInput += ".";
                operationDisplay += "."; // Agregar el punto decimal a la operación visible
                updateScreen(operationDisplay);
            }
        case "backspace":
            if (currentInput !== "") {
                    currentInput = currentInput.slice(0, -1); // Eliminar el último carácter
            }
    
            if (operationDisplay !== "") {
                    operationDisplay = operationDisplay.slice(0, -1); // También eliminar de la operación visible
            }
    
            if (currentInput === "" && operationDisplay === "") {
                    currentInput = "0"; // Si no queda nada, mostrar 0
                    operationDisplay = "0"; // Mostrar 0 en la operación visible
            }
    
             updateScreen(operationDisplay); // Actualizar la pantalla
             break;
        default:
            break;    
    }
}

// Funcion para realizar el calculo
function calculate(a, b, operator) {
    const numA = parseFloat(a);  //Convierte los números de tipo string a tipo número flotante para realizar operaciones matemáticas.
    const numB = parseFloat(b);  
    switch (operator) {   //Ejecuta la operación correspondiente al operador seleccionado (add, subtract, etc.).
        case "add":
            return (numA + numB).toString();
        case "subtract":
            return (numA - numB).toString();
        case "multiply": 
            return (numA * numB).toString();
        case "divide":
            return numB !== 0 ? (numA / numB).toString() : "Error"; // Evitar divicion entre 0
        default:
            return ""; 
    }                       //toString(): Convierte el resultado nuevamente a una cadena para que pueda mostrarse en la pantalla.
}

// Funcion para actualizar la pantalla
function updateScreen(value) {
    screen.textContent = value;   //Actualiza el contenido del elemento screen con el valor proporcionado.
}

// Función para convertir operadores a símbolos
function getOperatorSymbol(action) {
    switch (action) {
        case "add":
            return "+";
        case "subtract":
            return "-";
        case "multiply":
            return "*";
        case "divide":
            return "/";
        default:
            return "";
    }
}

// Resumen del flujo de trabajo:
//1- El usuario hace clic en un botón.
//2- El evento click detecta si es un número o una acción.
//3- Según el botón, se llama a handleNumber o handleAction.
//4- Cuando se presiona equals, calculate realiza la operación y actualiza la pantalla.