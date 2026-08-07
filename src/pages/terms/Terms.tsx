import { useNavigate } from 'react-router-dom'
import HeaderPublic from '../home/components/header/HeaderPublic'
import HeaderUser from '../home/components/header/HeaderUser'
import Footer from '../../shared/components/footer/Footer'
import useUserStore from '../../shared/store/useUserStore'
import './terms.css'

const secciones = [
  {
    titulo: '1. Aceptación de los términos',
    contenido: 'Al registrarte o realizar una compra en Phone Market, aceptas los presentes Términos y Condiciones en su totalidad.'
  },
  {
    titulo: '2. Productos y precios',
    contenido: 'Los precios mostrados incluyen impuestos de ley y pueden variar sin previo aviso. Nos reservamos el derecho de corregir errores de precio o disponibilidad.'
  },
  {
    titulo: '3. Proceso de compra',
    contenido: 'Para completar una compra es necesario contar con una cuenta registrada. El pedido se confirma una vez validado el pago.'
  },
  {
    titulo: '4. Garantía',
    contenido: 'Todos los equipos cuentan con garantía de fábrica de 12 meses contra defectos de fabricación, no aplicable a daños por mal uso.'
  },
  {
    titulo: '5. Cambios y devoluciones',
    contenido: 'El cliente cuenta con 7 días calendario desde la entrega para solicitar un cambio o devolución, siempre que el producto se encuentre en su empaque original y sin señales de uso.'
  },
  {
    titulo: '6. Protección de datos',
    contenido: 'La información personal proporcionada será utilizada únicamente para procesar tus pedidos y no será compartida con terceros sin tu consentimiento.'
  }
]

const Terms = () => {
  const { user } = useUserStore()
  const navigate = useNavigate()

  return (
    <div className='termsPage'>
      {user ? <HeaderUser /> : <HeaderPublic />}

      <div id='termsContent'>
        <button id='btnVolverTerms' onClick={() => navigate('/')}>← Volver al inicio</button>

        <h1>Términos y Condiciones</h1>
        <p id='termsSubtitle'>Última actualización: agosto 2026</p>

        <div id='termsList'>
          {secciones.map((item, index) => (
            <div className='termsItem' key={index}>
              <h3>{item.titulo}</h3>
              <p>{item.contenido}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Terms