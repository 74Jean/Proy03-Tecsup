import { useState, useEffect } from 'react'
import ChatMessages from './componentsChat/ChatMessages'
import ChatInput from './componentsChat/ChatInput'
import { enviarMensajeIA } from '../../../../services/chatService'
import { getPhones } from '../../../../services/dataServices'
import type { Phone } from '../../../../module/dataJson'
import './chatWidget.css'

export interface Mensaje {
  id: number
  texto: string
  esUsuario: boolean
}

const ChatWidget = () => {
  const [estaAbierto, setEstaAbierto] = useState(false)
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { id: 1, texto: 'Hola 👋 ¿Qué tipo de celular estás buscando?', esUsuario: false }
  ])
  const [cargando, setCargando] = useState(false)
  const [catalogo, setCatalogo] = useState<Phone[]>([])

  useEffect(() => {
    const cargarCatalogo = async () => {
      const data = await getPhones()
      setCatalogo(data)
    }
    cargarCatalogo()
  }, [])

  const toggleChat = () => {
    setEstaAbierto(!estaAbierto)
  }

  const enviarMensaje = async (texto: string) => {    
    const mensajeUsuario: Mensaje = {
      id: Date.now(),
      texto,
      esUsuario: true
    }
    
    const historialActualizado = [...mensajes, mensajeUsuario]
    setMensajes(historialActualizado)

    setCargando(true)
    const respuestaTexto = await enviarMensajeIA(historialActualizado, catalogo)
    setCargando(false)

    const mensajeBot: Mensaje = {
      id: Date.now() + 1,
      texto: respuestaTexto,
      esUsuario: false
    }
    setMensajes((prev) => [...prev, mensajeBot])
  }

  return (
    <>
      <button className="chatButton" onClick={toggleChat}>
        💬
      </button>

      {estaAbierto && (
        <div className="chatWindow">
          <div className="chatHeader">
            <span>Asistente de compras</span>
          </div>
          <div className="chatBody">
            <ChatMessages mensajes={mensajes} />
            {cargando && <div className="message messageBot">Escribiendo...</div>}
          </div>
          <ChatInput onEnviar={enviarMensaje} />
        </div>
      )}
    </>
  )
}

export default ChatWidget