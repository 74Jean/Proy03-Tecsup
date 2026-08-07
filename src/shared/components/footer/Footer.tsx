import { useNavigate } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  const navigate = useNavigate()
  const anioActual = new Date().getFullYear()

  return (
    <footer className='footer'>
      <div id='footerContent'>
        <div id='footerBrand'>
          <p id='footerTitle'><span>Phone</span> <span>Market</span></p>
          <p id='footerText'>Tu tienda de celulares con los mejores precios y garantía.</p>
        </div>

        <div id='footerLinks'>
          <p id='footerColTitle'>Enlaces</p>
          <span onClick={() => navigate('/')}>Inicio</span>
          <span onClick={() => navigate('/preguntas-frecuentes')}>Preguntas Frecuentes</span>
          <span onClick={() => navigate('/terminos-y-condiciones')}>Términos y Condiciones</span>
        </div>

        <div id='footerContact'>
          <p id='footerColTitle'>Contacto</p>
          <span>WhatsApp: +51 902740325</span>
          <span>contacto@phonemarket.com</span>
          <span>Ica, Perú</span>
        </div>
      </div>

      <div id='footerBottom'>
        <p>© {anioActual} Phone Market. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer