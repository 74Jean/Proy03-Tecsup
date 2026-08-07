import './chatMessages.css'
import type { Mensaje } from '../ChatWidget'
import { useEffect, useRef } from 'react'

interface Props {
  mensajes: Mensaje[]
}

const ChatMessages = ({mensajes}: Props) => {
  const finDelChatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    finDelChatRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  return (
    <div className="chatMessages">
      {mensajes.map((mensaje) => (
        <div 
          key={mensaje.id} 
          className={`message ${mensaje.esUsuario ? 'messageUser' : 'messageBot'}`}
        >
          {mensaje.texto}
        </div>
      ))}
      <div ref={finDelChatRef} />
    </div>
  )
}

export default ChatMessages