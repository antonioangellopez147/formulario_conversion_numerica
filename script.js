document.addEventListener("DOMContentLoaded", function () {
    // Selección de campos
    const decimalInput = document.getElementById("decimal");
    const binarioInput = document.getElementById("binario");
    const signoMagnitudInput = document.getElementById("signoMagnitud");
    const ca2Input = document.getElementById("ca2");
    const floatSimpleInput = document.getElementById("floatSimple");
    const floatDobleInput = document.getElementById("floatDoble");

    // Evento de entrada para cada campo
    decimalInput.addEventListener("input", () => convertFromDecimal(decimalInput.value));
    binarioInput.addEventListener("input", () => convertFromBinary(binarioInput.value));
    signoMagnitudInput.addEventListener("input", () => convertFromSignMagnitude(signoMagnitudInput.value));
    ca2Input.addEventListener("input", () => convertFromCa2(ca2Input.value));
    floatSimpleInput.addEventListener("input", () => convertFromFloat(floatSimpleInput.value, 32));
    floatDobleInput.addEventListener("input", () => convertFromFloat(floatDobleInput.value, 64));

    // Conversión desde decimal a los demás formatos
    function convertFromDecimal(decimalStr) {
        const decimal = parseFloat(decimalStr);
        if (isNaN(decimal)) return;

        binarioInput.value = decimalToBinary(decimal);
        signoMagnitudInput.value = decimalToSignMagnitude(decimal);
        ca2Input.value = decimalToCa2(decimal);
        floatSimpleInput.value = decimalToIEEE754(decimal, 32);
        floatDobleInput.value = decimalToIEEE754(decimal, 64);
    }

    // Conversión desde binario
    function convertFromBinary(binaryStr) {
        if (!/^[01]+$/.test(binaryStr)) return;

        const decimal = parseInt(binaryStr, 2);
        decimalInput.value = decimal;
        signoMagnitudInput.value = decimalToSignMagnitude(decimal);
        ca2Input.value = decimalToCa2(decimal);
        floatSimpleInput.value = decimalToIEEE754(decimal, 32);
        floatDobleInput.value = decimalToIEEE754(decimal, 64);
    }

    // Conversión desde signo-magnitud
    function convertFromSignMagnitude(signMagStr) {
        if (!/^[01]+$/.test(signMagStr)) return;

        const decimal = signMagnitudeToDecimal(signMagStr);
        decimalInput.value = decimal;
        binarioInput.value = decimalToBinary(decimal);
        ca2Input.value = decimalToCa2(decimal);
        floatSimpleInput.value = decimalToIEEE754(decimal, 32);
        floatDobleInput.value = decimalToIEEE754(decimal, 64);
    }

    // Conversión desde complemento a 2
    function convertFromCa2(ca2Str) {
        if (!/^[01]+$/.test(ca2Str)) return;

        const decimal = ca2ToDecimal(ca2Str);
        decimalInput.value = decimal;
        binarioInput.value = decimalToBinary(decimal);
        signoMagnitudInput.value = decimalToSignMagnitude(decimal);
        floatSimpleInput.value = decimalToIEEE754(decimal, 32);
        floatDobleInput.value = decimalToIEEE754(decimal, 64);
    }

    // Conversión desde coma flotante
    function convertFromFloat(floatStr, precision) {
        if (!/^[01]+$/.test(floatStr)) return;

        const decimal = ieee754ToDecimal(floatStr, precision);
        decimalInput.value = decimal;
        binarioInput.value = decimalToBinary(decimal);
        signoMagnitudInput.value = decimalToSignMagnitude(decimal);
        ca2Input.value = decimalToCa2(decimal);
    }

    // Funciones de conversión
    function decimalToBinary(decimal) {
        return (decimal >>> 0).toString(2);
    }

    function decimalToSignMagnitude(decimal) {
        return (decimal < 0 ? "1" : "0") + Math.abs(decimal).toString(2);
    }

    function decimalToCa2(decimal) {
        return (decimal >>> 0).toString(2).padStart(32, '0');
    }

    function signMagnitudeToDecimal(signMagStr) {
        const sign = signMagStr[0] === '1' ? -1 : 1;
        return sign * parseInt(signMagStr.slice(1), 2);
    }

    function ca2ToDecimal(ca2Str) {
        if (ca2Str[0] === '1') {
            return -((parseInt(ca2Str, 2) ^ ((1 << ca2Str.length) - 1)) + 1);
        } else {
            return parseInt(ca2Str, 2);
        }
    }

    function decimalToIEEE754(decimal, precision) {
        const buffer = new ArrayBuffer(precision / 8);
        const view = precision === 32 ? new Float32Array(buffer) : new Float64Array(buffer);
        view[0] = decimal;
        const bits = Array.from(new Uint8Array(buffer)).map(b => b.toString(2).padStart(8, '0')).join('');
        return bits;
    }

    function ieee754ToDecimal(binaryStr, precision) {
        const buffer = new ArrayBuffer(precision / 8);
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = parseInt(binaryStr.slice(i * 8, i * 8 + 8), 2);
        }
        const view = precision === 32 ? new Float32Array(buffer) : new Float64Array(buffer);
        return view[0];
    }
});