import { useNavigate } from 'react-router-dom'
import './headerPublic.css'


const HeaderPublic = () => {
  const navigate = useNavigate()
  return (
    <header className='headerPublic'>
      <p id='headTitle'><span>Phone</span> <span>Market</span></p>

      <div id='headerActions'>
        <div id='cartIcon'>
          🛒
        </div>

        <button id='btnLogin' onClick={() => navigate('/login')}>Iniciar Sesión</button>
      </div>
    </header>
  )
}

export default HeaderPublic