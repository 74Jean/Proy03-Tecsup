
import './headerPublic.css'


const HeaderPublic = () => {
  return (
    <header className='headerPublic'>
      <p id='headTitle'><span>Phone</span> <span>Market</span></p>

      <div id='headerActions'>
        <div id='cartIcon'>
          🛒
        </div>

        <button id='btnLogin'>Iniciar Sesión</button>
      </div>
    </header>
  )
}

export default HeaderPublic