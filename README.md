# Chat con IA usando Groq

Este proyecto implementa un chat interactivo que utiliza la API de Groq con el modelo Mixtral-8x7b para procesar preguntas y generar respuestas.

## 🚀 Características

- Interfaz de chat intuitiva y responsive
- Integración con Groq API (modelo Mixtral-8x7b)
- Diseño minimalista y funcional
- Soporte para mensajes de usuario y respuestas de IA
- Indicador de "pensando" durante el procesamiento
- Despliegue en Netlify

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - Vite (bundler y dev server)
  - JavaScript vanilla
  - CSS moderno
  - HTML5

- **API:**
  - Groq SDK
  - Modelo: Mixtral-8x7b-32768

- **Despliegue:**
  - Netlify

## 📦 Estructura del Proyecto

```
/
├── data/
│   ├── chat-history.json
│   ├── datos_generados.json
│   └── faq-database.json
├── src/
│   └── ...
├── index.html
├── main.js
├── style.css
├── vite.config.js
└── package.json
```

## 🔧 Configuración

El proyecto utiliza las siguientes configuraciones principales:

```javascript
// Configuración de Groq
const groq = new Groq({
  apiKey: 'your-api-key',
  dangerouslyAllowBrowser: true
});

// Parámetros del modelo
{
  model: "mixtral-8x7b-32768",
  temperature: 0.7,
  max_tokens: 1024
}
```

## 🌐 Despliegue

El proyecto está desplegado en Netlify y accesible en:
https://singular-marigold-005a93.netlify.app

## 💾 Gestión de Datos

El proyecto incluye varios archivos JSON para la gestión de datos:

- `chat-history.json`: Almacena el historial de conversaciones
- `faq-database.json`: Base de datos de preguntas frecuentes y grupos de palabras
- `datos_generados.json`: Almacena datos generados durante las interacciones

## 🎨 Interfaz de Usuario

La interfaz incluye:
- Campo de entrada para preguntas
- Área de visualización de mensajes
- Botón de envío
- Indicador de estado durante el procesamiento

## 📝 Estilos

El diseño utiliza un sistema de estilos moderno con:
- Diseño responsive
- Sistema de colores coherente
- Animaciones suaves
- Scrollbar personalizado
- Diseño de mensajes diferenciado para usuario y IA

## 🔄 Actualizaciones

- Implementación inicial del chat
- Integración con Groq API
- Optimización de la interfaz de usuario
- Despliegue en Netlify

## 🔗 Enlaces Útiles

- [Documentación de Groq](https://console.groq.com/docs)
- [Vite](https://vitejs.dev/)
- [Netlify](https://www.netlify.com/)