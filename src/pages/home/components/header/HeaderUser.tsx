import { useNavigate } from 'react-router-dom'
import useUserStore from '../../../../shared/store/useUserStore'
import './headerUser.css'

const HeaderUser = () => {
  const { user, logout } = useUserStore()
  const navigate = useNavigate()

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
        <div id='cartIcon'>
          🛒
          <span id='cartBadge'>2</span>
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