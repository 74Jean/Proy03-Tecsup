import { useState } from 'react'
import './chatInput.css'

interface Props {
  onEnviar: (texto: string) => void
}

const ChatInput = ({ onEnviar }: Props) => {
  const [texto, setTexto] = useState('')

  const handleEnviar = () => {
    if (texto.trim() === '') return
    onEnviar(texto)
    setTexto('')
  }

  return (
    <div className="chatInput">
      <input 
        type="text" 
        placeholder="Escribe tu mensaje..." 
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleEnviar()
        }}
      />
      <button onClick={handleEnviar}>➤</button>
    </div>
  )
}

export default ChatInput