import { GoogleGenAI } from "@google/genai"
import type { Phone } from "../../../../phone-market/src/module/dataJson"
import type { Mensaje } from "../../../../phone-market/src/pages/home/components/chat/ChatWidget"

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

export const enviarMensajeIA = async (
  historial: Mensaje[],
  catalogo: Phone[]
): Promise<string> => {

  const catalogoResumido = catalogo.map((phone) => ({
    nombre: phone.title,
    marca: phone.brand,
    precio: phone.price,
    rating: phone.rating,
    stock: phone.stock
  }))

  const promptSistema = `Eres un asistente de ventas de la tienda "Phone Market".
    SOLO puedes recomendar celulares de la siguiente lista, nunca inventes productos que no estén aquí:
    ${JSON.stringify(catalogoResumido)}
    Todos los precios están en soles peruanos (S/), nunca los menciones en dólares.
    Si el usuario pide algo que no tienes disponible, dile amablemente que no lo tienes y sugiere la alternativa más cercana de la lista.
    Sé breve y conversacional, no uses listas largas ni markdown, responde como en un chat normal.`

  const contenidoConversacion = historial.map((mensaje) => ({
    role: mensaje.esUsuario ? "user" : "model",
    parts: [{ text: mensaje.texto }]
  }))

  const respuesta = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: contenidoConversacion,
    config: {
      systemInstruction: promptSistema
    }
  })

  return respuesta.text ?? "Lo siento, no pude procesar tu mensaje."
}