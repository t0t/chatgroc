import express from 'express';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Asegurar que el directorio y archivo existan
async function initializeDataFile() {
  const dataDir = join(__dirname, 'data');
  const filePath = join(dataDir, 'datos_generados.json');
  
  try {
    // Crear directorio data si no existe
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }
    
    // Crear archivo si no existe
    if (!existsSync(filePath)) {
      const initialData = {
        interacciones: [],
        metadata: {
          ultima_actualizacion: new Date().toISOString(),
          total_interacciones: 0
        }
      };
      await writeFile(filePath, JSON.stringify(initialData, null, 2));
    }
  } catch (error) {
    console.error('Error inicializando archivo de datos:', error);
  }
}

// Inicializar archivo al arrancar el servidor
initializeDataFile();

// Ruta para guardar datos
app.post('/api/save', async (req, res) => {
  try {
    const filePath = join(__dirname, 'data', 'datos_generados.json');
    let data;
    
    try {
      const fileContent = await readFile(filePath, 'utf-8');
      data = JSON.parse(fileContent);
    } catch (error) {
      // Si hay error leyendo el archivo, inicializar con estructura básica
      data = {
        interacciones: [],
        metadata: {
          ultima_actualizacion: new Date().toISOString(),
          total_interacciones: 0
        }
      };
    }
    
    // Añadir nueva interacción
    data.interacciones.push(req.body);
    data.metadata.ultima_actualizacion = new Date().toISOString();
    data.metadata.total_interacciones = data.interacciones.length;
    
    // Guardar archivo
    await writeFile(filePath, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error al guardar datos:', error);
    res.status(500).json({ error: 'Error al guardar datos' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});