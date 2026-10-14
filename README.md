# Validador y Generador de Contraseñas

Aplicación web hecha con Next.js, React y TypeScript que evalúa la fortaleza de una contraseña en tiempo real y genera contraseñas aleatorias de 16 caracteres.

## Funcionalidades

- **Validación en tiempo real** con puntuación de 0 a 6 según:
  - Longitud (8 o más caracteres suma 1 punto; 12 o más suma 2).
  - Letras mayúsculas.
  - Letras minúsculas.
  - Números.
  - Símbolos especiales.
- Nivel de seguridad con etiqueta y color: muy débil, débil, moderada, fuerte, muy fuerte.
- **Generador** de contraseñas de 16 caracteres con al menos una minúscula, una mayúscula, un número y un símbolo.
- Botón para **copiar al portapapeles** con confirmación visual.
- Diseño responsivo.

## Tecnologías

Next.js · React · TypeScript · Tailwind CSS · shadcn/ui · Lucide React

## Instalación

```bash
git clone https://github.com/pagarcia22/password-validator.git
cd password-validator
npm install
npm run dev
```

Abre `http://localhost:3000` en el navegador.

## Notas de seguridad

La contraseña se evalúa en tu navegador y no se envía a ningún servidor.

## Mejoras pendientes

- Usar `crypto.getRandomValues()` en el generador en lugar de `Math.random()`, que no es criptográficamente seguro.
- Detectar patrones comunes (por ejemplo `123456` o `password`) y caracteres repetidos.
- Agregar pruebas para las funciones de validación y generación.
