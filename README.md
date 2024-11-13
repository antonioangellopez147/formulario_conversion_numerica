
# Conversor Numérico entre Formatos

Esta aplicación permite convertir números entre diferentes formatos, incluyendo decimal, binario, signo-magnitud, complemento a 2 y formatos de coma flotante (IEEE 754) de precisión simple (32 bits) y precisión doble (64 bits). Está desarrollada en HTML, CSS y JavaScript.

## Tabla de contenidos

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Funciones de Conversión](#funciones-de-conversión)
- [Contribuciones](#contribuciones)
- [Contacto](#contacto)

## Características

- Conversión de números decimales a binario, signo-magnitud, complemento a 2, y coma flotante en precisión simple y doble.
- Conversión de binario, signo-magnitud y complemento a 2 a decimal.
- Conversión de números en formato IEEE 754 de precisión simple y doble a decimal.
- Validación de los valores de entrada según el formato requerido (e.g., exactitud de bits y rango de valores).
  
## Estructura del Proyecto

```plaintext
.
├── index.html          # Archivo principal HTML
├── css/
│   └── style.css       # Estilos de la aplicación
├── js/
│   ├── script.js       # Funcionalidad principal de conversión
│   └── format.js       # Archivo adicional para manejo de formatos (si es necesario)
└── img/
    └── favicon.ico     # Icono de la aplicación
```

## Instalación

1. Clona o descarga el repositorio en tu máquina local.
2. Abre `index.html` en un navegador web para ejecutar la aplicación.

## Uso

1. **Número en decimal**: Ingresa un número en formato decimal (e.g., `-123.45`) para convertirlo automáticamente a los demás formatos.
2. **Número en binario**: Ingresa un número binario de hasta 64 bits para ver su equivalente en los otros formatos.
3. **Número en signo-magnitud**: Ingresa un número binario en formato signo-magnitud para convertirlo a decimal, binario estándar y complemento a 2.
4. **Número en complemento a 2**: Ingresa un número binario en formato complemento a 2 para convertirlo a los otros formatos.
5. **Número en coma flotante (32 o 64 bits)**: Ingresa un número binario en formato IEEE 754 de 32 o 64 bits para ver su valor decimal.

## Funciones de Conversión

- `decimalToBinary(decimal)`: Convierte un número decimal a binario.
- `decimalToSignMagnitude(decimal)`: Convierte un número decimal a formato signo-magnitud.
- `decimalToCa2(decimal)`: Convierte un número decimal a complemento a 2.
- `decimalToIEEE754(decimal, precision)`: Convierte un decimal a IEEE 754 (32 o 64 bits).
- `signMagnitudeToDecimal(signMagStr)`: Convierte un número en signo-magnitud a decimal.
- `ca2ToDecimal(ca2Str)`: Convierte un número en complemento a 2 a decimal.
- `ieee754ToDecimal(binary, precision)`: Convierte un número IEEE 754 a decimal.

## Contribuciones

Las contribuciones son bienvenidas. Puedes realizar un fork del proyecto y enviar tus mejoras a través de un pull request.

## Contacto

Desarrollado por Antonio Ángel López Fernández (<antonioangel.lopez147@comunidadunir.net>)
