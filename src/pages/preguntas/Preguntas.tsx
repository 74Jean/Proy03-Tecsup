import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderPublic from '../home/components/header/HeaderPublic'
import HeaderUser from '../home/components/header/HeaderUser'
import Footer from '../../shared/components/footer/Footer'
import useUserStore from '../../shared/store/useUserStore'
import './preguntas.css'

const preguntas = [
  {
    pregunta: '¿Cuáles son los métodos de pago disponibles?',
    respuesta: 'Aceptamos Yape, Plin, transferencia bancaria y tarjetas de crédito o débito.'
  },
  {
    pregunta: '¿Los celulares tienen garantía?',
    respuesta: 'Sí, todos nuestros equipos cuentan con garantía de fábrica de 12 meses.'
  },
  {
    pregunta: '¿Cuánto demora el envío?',
    respuesta: 'El envío dentro de Ica demora entre 1 y 2 días hábiles, y a provincias entre 3 y 5 días hábiles.'
  },
  {
    pregunta: '¿Puedo devolver un producto?',
    respuesta: 'Sí, tienes hasta 7 días calendario desde la entrega para solicitar un cambio o devolución, siempre que el producto esté en su empaque original.'
  },
  {
    pregunta: '¿Necesito una cuenta para comprar?',
    respuesta: 'Sí, necesitas registrarte e iniciar sesión para agregar productos al carrito y completar tu compra.'
  },
  {
    pregunta: '¿Cómo puedo contactar con soporte?',
    respuesta: 'Puedes escribirnos por el botón de WhatsApp ubicado en la esquina inferior de la pantalla, o al correo contacto@phonemarket.com.'
  }
]

const Faq = () => {
  const { user } = useUserStore()
  const navigate = useNavigate()
  const [abierta, setAbierta] = useState<number | null>(null)

  const toggle = (index: number) => {
    setAbierta((prev) => (prev === index ? null : index))
  }

  return (
    <div className='faqPage'>
      {user ? <HeaderUser /> : <HeaderPublic />}

      <div id='faqContent'>
        <button id='btnVolverFaq' onClick={() => navigate('/')}>← Volver al inicio</button>

        <h1>Preguntas Frecuentes</h1>
        <p id='faqSubtitle'>Resolvemos tus dudas más comunes sobre Phone Market</p>

        <div id='faqList'>
          {preguntas.map((item, index) => (
            <div className={`faqItem ${abierta === index ? 'faqItemAbierta' : ''}`} key={index} onClick={() => toggle(index)}>
              <div className='faqPregunta'>
                <p>{item.pregunta}</p>
                <span>{abierta === index ? '−' : '+'}</span>
              </div>
              {abierta === index && <p className='faqRespuesta'>{item.respuesta}</p>}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Faq