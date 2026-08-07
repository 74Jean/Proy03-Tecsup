import { useNavigate } from 'react-router-dom'
import useUserStore from '../../../../shared/store/useUserStore'
import useCartStore from '../../../../shared/store/useCartStore'
import './headerUser.css'

const HeaderUser = () => {
  const { user, logout } = useUserStore()
  const navigate = useNavigate()
  const totalItems = useCartStore((state) => state.distinctItemsCount())

  const cerrarSesion = () => {
    logout()
    navigate('/')
  }

  const iniciales = user
    ? `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase()
    : ''

  return (
    <header className='headerUser'>
      <p id='headTitle'><span>Phone</span> <span>Market</span></p>

      <div id='headerActions'>
        <div id='cartIcon' onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
          🛒
          {totalItems > 0 && <span id='cartBadge'>{totalItems}</span>}
        </div>

        <div id='userSection'>
          <div id='userAvatar'>{iniciales}</div>
          <p id='userName'>{user?.nombre} {user?.apellido}</p>
        </div>

        <button id='btnLogout' onClick={cerrarSesion}>Cerrar sesión</button>
      </div>
    </header>
  )
}

export default HeaderUser