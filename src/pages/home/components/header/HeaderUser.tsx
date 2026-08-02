import './headerPublic.css'

const HeaderUser = () => {
  return (
     <header className='headerUser'>
      <p id='headTitle'><span>Phone</span> <span>Market</span></p>

      <div id='headerActions'>
        <div id='cartIcon'>
          🛒
          <span id='cartBadge'>2</span>
        </div>

        <div id='userSection'>
          <div id='userAvatar'>KR</div>
          <p id='userName'>kevin Ramos</p>
        </div>

        <button id='btnLogout'>Cerrar sesión</button>
      </div>
    </header>
  )
}

export default HeaderUser