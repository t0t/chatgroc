// Import Groq SDK
import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

// Función para hacer preguntas
async function hacerPregunta(pregunta) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: pregunta }],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || 'No se obtuvo respuesta';
  } catch (error) {
    console.error('Error:', error);
    return 'Ocurrió un error al procesar tu pregunta';
  }
}

// Actualizar el contenido de la app
document.querySelector('#app').innerHTML = `
  <div class="content">
    <h1>Chat con IA</h1>
    <div class="chat-container">
      <div id="chat-messages" class="messages"></div>
      <div class="input-container">
        <input type="text" id="user-input" placeholder="Escribe tu pregunta aquí..." />
        <button id="send-button">Enviar</button>
      </div>
    </div>
  </div>
`;

// Elementos del DOM
const input = document.querySelector('#user-input');
const sendButton = document.querySelector('#send-button');
const messagesContainer = document.querySelector('#chat-messages');

// Función para agregar un mensaje al chat
function addMessage(content, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
  messageDiv.textContent = content;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Manejar el envío de mensajes
async function handleSubmit() {
  const pregunta = input.value.trim();
  if (!pregunta) return;

  addMessage(pregunta, true);
  input.value = '';

  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'message ai-message loading';
  loadingDiv.textContent = 'Pensando...';
  messagesContainer.appendChild(loadingDiv);

  const respuesta = await hacerPregunta(pregunta);
  
  messagesContainer.removeChild(loadingDiv);
  addMessage(respuesta);
}

// Event listeners
sendButton.addEventListener('click', handleSubmit);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSubmit();
});