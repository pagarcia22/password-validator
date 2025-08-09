🔐 Password Validator & Secure Generator
Aplicación interactiva en React + TypeScript para evaluar la seguridad de contraseñas en tiempo real y generar contraseñas seguras de manera automática.
Incluye validaciones, sugerencias de mejora y un generador que garantiza alta entropía.

🚀 Características
Validación en tiempo real de la fortaleza de la contraseña.

Evaluación basada en:

Longitud mínima y óptima.

Inclusión de mayúsculas, minúsculas, números y símbolos especiales.

Detección de patrones comunes o inseguros.

Sistema de puntuación (0-6) con etiquetas y colores para cada nivel:

Muy débil, Débil, Moderada, Fuerte, Muy fuerte.

Generador de contraseñas seguras:

Longitud fija de 16 caracteres.

Incluye letras mayúsculas y minúsculas, números y símbolos.

Sin patrones predecibles.

Función de copiado al portapapeles con confirmación visual.

Diseño responsivo con TailwindCSS y componentes shadcn/ui.

🛠️ Tecnologías utilizadas
React (con hooks useState y useEffect)

TypeScript

TailwindCSS

shadcn/ui (Button, Input, Card, Badge, etc.)

Lucide-react (Iconos SVG)

API de Clipboard de JavaScript

📂 Estructura del componente principal
Validación de contraseñas → validatePassword(pwd: string)

Generación de contraseñas seguras → generateSecurePassword()

Copia al portapapeles → copyToClipboard(text: string)

Interfaz PasswordStrength para tipar resultados de validación.

📦 Instalación y uso
Clonar el repositorio

bash
Copiar
Editar
git clone https://github.com/usuario/password-validator.git
cd password-validator
Instalar dependencias

bash
Copiar
Editar
npm install
Iniciar el servidor de desarrollo

bash
Copiar
Editar
npm run dev
Abrir en el navegador

arduino
Copiar
Editar
http://localhost:3000
📸 Vista previa
(Aquí puedes agregar un screenshot o gif del funcionamiento de la app)

🛡️ Consejos de seguridad
No reutilices contraseñas.

Usa un gestor de contraseñas.

Activa autenticación en dos pasos (2FA).

Cambia contraseñas comprometidas.