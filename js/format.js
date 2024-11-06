document.addEventListener("DOMContentLoaded", function () {
    const decimalInput = document.getElementById("decimal");
    const binaryInputs = [
        document.getElementById("binario"),
        document.getElementById("signoMagnitud"),
        document.getElementById("ca2"),
        document.getElementById("floatSimple"),
        document.getElementById("floatDoble")
    ];

    // Restringir la entrada en el campo de decimal
    decimalInput.addEventListener("keydown", function (event) {
        const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "-"];
        const isNumber = /[0-9]/.test(event.key);
        const isDecimalPoint = event.key === "." && !decimalInput.value.includes(".");

        if (!isNumber && !allowedKeys.includes(event.key) && !isDecimalPoint) {
            event.preventDefault();
        }
    });

    // Restringir la entrada en los campos binarios
    binaryInputs.forEach(input => {
        input.addEventListener("keydown", function (event) {
            const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
            const isBinary = event.key === "0" || event.key === "1";

            if (!isBinary && !allowedKeys.includes(event.key)) {
                event.preventDefault();
            }
        });
    });
});
