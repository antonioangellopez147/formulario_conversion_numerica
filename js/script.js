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
        if (![32, 64].includes(precision)) {
            throw new Error("La precisión debe ser 32 o 64 bits.");
        }

        let buffer = new ArrayBuffer(precision / 8);
        let view = new DataView(buffer);

        if (precision === 32) {
            view.setFloat32(0, decimal, false); // false para Big Endian
        } else if (precision === 64) {
            view.setFloat64(0, decimal, false); // false para Big Endian
        }

        let binaryString = '';
        for (let i = 0; i < buffer.byteLength; i++) {
            let byte = view.getUint8(i);
            binaryString += byte.toString(2).padStart(8, '0');
        }

        return binaryString;
    }

    function ieee754ToDecimal(binary, precision) {
        if (![32, 64].includes(precision)) {
            throw new Error("La precisión debe ser 32 o 64 bits.");
        }

        // Aseguramos que la longitud del binario sea correcta
        if (binary.length !== precision) {
            throw new Error(`El binario debe tener exactamente ${precision} bits.`);
        }

        let buffer = new ArrayBuffer(precision / 8);
        let view = new DataView(buffer);

        // Convertimos el binario en un ArrayBuffer
        for (let i = 0; i < buffer.byteLength; i++) {
            let byte = binary.slice(i * 8, (i + 1) * 8);
            view.setUint8(i, parseInt(byte, 2));
        }

        // Devolvemos el número decimal
        if (precision === 32) {
            return view.getFloat32(0, false); // false para Big Endian
        } else if (precision === 64) {
            return view.getFloat64(0, false); // false para Big Endian
        }
    }
});