"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, RefreshCw, Copy, Check, Shield, AlertTriangle } from "lucide-react"

// Interfaz que define la estructura de los datos de fortaleza de contraseña
interface PasswordStrength {
  score: number // Puntuación de 0 a 6
  feedback: string[] // Lista de comentarios sobre la contraseña
  suggestions: string[] // Lista de sugerencias para mejorar
  color: string // Color CSS para el badge
  label: string // Etiqueta descriptiva del nivel
}

export default function PasswordValidator() {
  // Estados del componente
  const [password, setPassword] = useState("") // Contraseña ingresada por el usuario
  const [showPassword, setShowPassword] = useState(false) // Controla si mostrar u ocultar la contraseña
  const [strength, setStrength] = useState<PasswordStrength | null>(null) // Datos de fortaleza de la contraseña
  const [suggestedPassword, setSuggestedPassword] = useState("") // Contraseña generada automáticamente
  const [copied, setCopied] = useState(false) // Estado para mostrar confirmación de copiado

  /**
   * Función principal que evalúa la fortaleza de una contraseña
   * @param pwd - La contraseña a evaluar
   * @returns Objeto PasswordStrength con toda la información de evaluación
   */
  const validatePassword = (pwd: string): PasswordStrength => {
    let score = 0 // Puntuación inicial
    const feedback: string[] = [] // Array para almacenar comentarios
    const suggestions: string[] = [] // Array para almacenar sugerencias

    // CRITERIO 1: Evaluación de longitud
    if (pwd.length >= 12) {
      score += 2 // Longitud excelente: +2 puntos
      feedback.push("✓ Longitud adecuada (12+ caracteres)")
    } else if (pwd.length >= 8) {
      score += 1 // Longitud aceptable: +1 punto
      feedback.push("⚠ Longitud aceptable (8+ caracteres)")
      suggestions.push("Usa al menos 12 caracteres para mayor seguridad")
    } else {
      // Longitud insuficiente: 0 puntos
      feedback.push("✗ Muy corta (menos de 8 caracteres)")
      suggestions.push("Usa al menos 8 caracteres, idealmente 12 o más")
    }

    // CRITERIO 2: Presencia de letras mayúsculas
    if (/[A-Z]/.test(pwd)) {
      score += 1 // Tiene mayúsculas: +1 punto
      feedback.push("✓ Contiene mayúsculas")
    } else {
      feedback.push("✗ Sin mayúsculas")
      suggestions.push("Incluye al menos una letra mayúscula")
    }

    // CRITERIO 3: Presencia de letras minúsculas
    if (/[a-z]/.test(pwd)) {
      score += 1 // Tiene minúsculas: +1 punto
      feedback.push("✓ Contiene minúsculas")
    } else {
      feedback.push("✗ Sin minúsculas")
      suggestions.push("Incluye al menos una letra minúscula")
    }

    // CRITERIO 4: Presencia de números
    if (/[0-9]/.test(pwd)) {
      score += 1 // Tiene números: +1 punto
      feedback.push("✓ Contiene números")
    } else {
      feedback.push("✗ Sin números")
      suggestions.push("Incluye al menos un número")
    }

    // CRITERIO 5: Presencia de símbolos especiales
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) {
      score += 1 // Tiene símbolos: +1 punto
      feedback.push("✓ Contiene símbolos especiales")
    } else {
      feedback.push("✗ Sin símbolos especiales")
      suggestions.push("Incluye símbolos como !@#$%^&*")
    }

    // CRITERIO 6: Detección de patrones comunes (penalización)
    const commonPatterns = [
      /123456/, // Secuencias numéricas
      /contraseña/i,
      /password/i, // Palabra "password"
      /qwerty/i, // Secuencia de teclado
      /abc/i, // Secuencia alfabética
      /(.)\1{2,}/, // Caracteres repetidos (3 o más veces)
    ]

    let hasCommonPattern = false
    commonPatterns.forEach((pattern) => {
      if (pattern.test(pwd)) {
        hasCommonPattern = true
      }
    })

    if (hasCommonPattern) {
      score -= 1 // Penalización por patrones comunes: -1 punto
      feedback.push("✗ Contiene patrones comunes")
      suggestions.push("Evita secuencias obvias como '123' o 'abc'")
    } else if (pwd.length > 0) {
      feedback.push("✓ Sin patrones obvios")
    }

    // DETERMINACIÓN DEL NIVEL DE SEGURIDAD
    // Basado en la puntuación total, asigna color y etiqueta
    let color = "bg-red-500" // Color por defecto (muy débil)
    let label = "Muy débil" // Etiqueta por defecto

    if (score >= 5) {
      color = "bg-green-500" // Verde para muy fuerte
      label = "Muy fuerte"
    } else if (score >= 4) {
      color = "bg-lime-500" // Verde lima para fuerte
      label = "Fuerte"
    } else if (score >= 3) {
      color = "bg-yellow-500" // Amarillo para moderada
      label = "Moderada"
    } else if (score >= 1) {
      color = "bg-orange-500" // Naranja para débil
      label = "Débil"
    }

    // Retorna el objeto con toda la información de evaluación
    return {
      score: Math.max(0, Math.min(6, score)), // Limita la puntuación entre 0 y 6
      feedback,
      suggestions,
      color,
      label,
    }
  }

  /**
   * Genera una contraseña segura aleatoria
   * @returns String con una contraseña de 16 caracteres
   */
  const generateSecurePassword = (): string => {
    // Conjuntos de caracteres para la generación
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    const allChars = lowercase + uppercase + numbers + symbols
    let password = ""

    // PASO 1: Garantizar al menos un carácter de cada tipo
    password += lowercase[Math.floor(Math.random() * lowercase.length)]
    password += uppercase[Math.floor(Math.random() * uppercase.length)]
    password += numbers[Math.floor(Math.random() * numbers.length)]
    password += symbols[Math.floor(Math.random() * symbols.length)]

    // PASO 2: Completar hasta 16 caracteres con caracteres aleatorios
    for (let i = 4; i < 16; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)]
    }

    // PASO 3: Mezclar todos los caracteres para evitar patrones predecibles
    return password
      .split("") // Convierte a array
      .sort(() => Math.random() - 0.5) // Mezcla aleatoriamente
      .join("") // Convierte de vuelta a string
  }

  /**
   * Copia texto al portapapeles y muestra confirmación
   * @param text - Texto a copiar
   */
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true) // Muestra confirmación
      setTimeout(() => setCopied(false), 2000) // Oculta confirmación después de 2 segundos
    } catch (err) {
      console.error("Error al copiar:", err)
    }
  }

  // EFECTO: Evalúa la contraseña cada vez que cambia
  useEffect(() => {
    if (password) {
      setStrength(validatePassword(password))
    } else {
      setStrength(null) // Limpia la evaluación si no hay contraseña
    }
  }, [password])

  // EFECTO: Genera una contraseña sugerida al cargar el componente
  useEffect(() => {
    setSuggestedPassword(generateSecurePassword())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* SECCIÓN: Encabezado de la aplicación */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Validador de Contraseñas</h1>
          </div>
          <p className="text-gray-600">Verifica la seguridad de tu contraseña y obtén sugerencias para mejorarla</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* TARJETA 1: Validador de Contraseña */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Validar Contraseña
              </CardTitle>
              <CardDescription>Ingresa tu contraseña para evaluar su seguridad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Campo de entrada de contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password">Tu contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"} // Cambia entre texto y contraseña
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                    placeholder="Ingresa tu contraseña..."
                    className="pr-10"
                  />
                  {/* Botón para mostrar/ocultar contraseña */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* SECCIÓN: Resultados de la evaluación (solo se muestra si hay evaluación) */}
              {strength && (
                <div className="space-y-4">
                  {/* Indicador visual de nivel de seguridad */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Nivel de seguridad</span>
                      {/* Badge con color dinámico basado en la evaluación */}
                      <Badge variant="outline" className={`${strength.color} text-white border-0`}>
                        {strength.label}
                      </Badge>
                    </div>

                    {/* BARRA DE PROGRESO CON CAMBIO DE COLOR DINÁMICO */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          // Lógica de colores basada en la puntuación
                          strength.score >= 5
                            ? "bg-green-500" // Verde: Muy fuerte (5-6 puntos)
                            : strength.score >= 4
                              ? "bg-lime-500" // Azul: Fuerte (4 puntos)
                              : strength.score >= 3
                                ? "bg-yellow-500" // Amarillo: Moderada (3 puntos)
                                : strength.score >= 1
                                  ? "bg-orange-500" // Naranja: Débil (1-2 puntos)
                                  : "bg-red-500" // Rojo: Muy débil (0 puntos)
                        }`}
                        style={{
                          width: `${(strength.score / 6) * 100}%`, // Ancho basado en puntuación (0-100%)
                        }}
                      />
                    </div>
                  </div>

                  {/* Lista de análisis detallado */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Análisis:</h4>
                    <ul className="text-sm space-y-1">
                      {strength.feedback.map((item, index) => (
                        <li
                          key={index}
                          className={`${
                            // Colores basados en el tipo de feedback
                            item.startsWith("✓")
                              ? "text-green-600" // Verde para elementos positivos
                              : item.startsWith("⚠")
                                ? "text-yellow-600" // Amarillo para advertencias
                                : "text-red-600" // Rojo para elementos negativos
                          }`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lista de sugerencias (solo se muestra si hay sugerencias) */}
                  {strength.suggestions.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Sugerencias:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        {strength.suggestions.map((suggestion, index) => (
                          <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* TARJETA 2: Generador de Contraseña Segura */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Contraseña Segura Sugerida
              </CardTitle>
              <CardDescription>Usa esta contraseña generada automáticamente para mayor seguridad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Campo de contraseña sugerida */}
              <div className="space-y-2">
                <Label htmlFor="suggested">Contraseña sugerida</Label>
                <div className="flex gap-2">
                  <Input
                    id="suggested"
                    type="text"
                    value={suggestedPassword}
                    readOnly
                    className="font-mono" // Fuente monoespaciada para mejor legibilidad
                  />
                  {/* Botón de copiar con feedback visual */}
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(suggestedPassword)}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Botón para generar nueva contraseña */}
              <Button
                onClick={() => setSuggestedPassword(generateSecurePassword())}
                className="w-full"
                variant="outline"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generar Nueva Contraseña
              </Button>

              {/* Información sobre la contraseña generada */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Esta contraseña incluye:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✓ 16 caracteres de longitud</li>
                  <li>✓ Letras mayúsculas y minúsculas</li>
                  <li>✓ Números</li>
                  <li>✓ Símbolos especiales</li>
                  <li>✓ Sin patrones predecibles</li>
                </ul>
              </div>

              {/* Consejos de seguridad */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Consejos de seguridad:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• No reutilices contraseñas</li>
                  <li>• Usa un gestor de contraseñas</li>
                  <li>• Activa la autenticación de dos factores</li>
                  <li>• Cambia contraseñas comprometidas</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}