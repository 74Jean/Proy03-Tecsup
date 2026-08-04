import { useNavigate, useLocation } from 'react-router-dom'
import useCartStore from '../../../../shared/store/useCartStore'
import './headerPublic.css'

const HeaderPublic = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const totalItems = useCartStore((state) => state.distinctItemsCount())

  const handleCartClick = () => {
    navigate('/login', { state: { from: location.pathname } })
  }

  return (
    <header className='headerPublic'>
      <p id='headTitle'><span>Phone</span> <span>Market</span></p>

      <div id='headerActions'>
        <div id='cartIcon' onClick={handleCartClick} style={{ cursor: 'pointer' }}>
          🛒
          {totalItems > 0 && <span id='cartBadge'>{totalItems}</span>}
        </div>

        <button id='btnLogin' onClick={() => navigate('/login')}>Iniciar Sesión</button>
      </div>
    </header>
  )
}

export default HeaderPublic