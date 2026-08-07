import { useState, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../../shared/store/useUserStore'
import '../login/login.css'

interface Usuario {
  nombre: string
  apellido: string
  usuario: string
  password: string
}

const Login = () => {

  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login2 } = useUserStore()

  const iniciarSesion = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formulario = e.currentTarget
    const formData = new FormData(formulario)
    const data = Object.fromEntries(formData) as {
      usuario: string
      password: string
    }

    if (!data.usuario || !data.password) {
      setError('Todos los campos son obligatorios')
      return
    }

    const usuariosGuardados: Usuario[] = JSON.parse(
      localStorage.getItem('usuarios') || '[]'
    )

    const usuarioEncontrado = usuariosGuardados.find(
      (u) => u.usuario === data.usuario && u.password === data.password
    )

    if (!usuarioEncontrado) {
      setError('Usuario o contraseña incorrectos')
      return
    }

    login2({
      nombre: usuarioEncontrado.nombre,
      apellido: usuarioEncontrado.apellido,
      usuario: usuarioEncontrado.usuario
    })

    setError('')
    formulario.reset()

    navigate('/')
  }

  return (
    <div className='login'>
      <header>
        <p id='headTitle'><span>Phone</span> <span>Market</span></p>
      </header>

      <main>
        <div id='loginContainer'>
          <div id='loginHeader'>
            <h2>Bienvenido de vuelta</h2>
            <p>Ingresa tus credenciales para continuar</p>
          </div>

          <form action="" onSubmit={iniciarSesion}>
            <div className='inputGroup'>
              <label htmlFor="usuario">Usuario</label>
              <input type="text" id="usuario" name='usuario' />
            </div>

            <div className='inputGroup'>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name='password' />
            </div>

            <p className='errorText'>{error}</p>

            <button id='btnLogin' type='submit'>Iniciar Sesion</button>
          </form>

          <p id='volverText'>¿No tienes cuenta? <span onClick={() => navigate('/registro')}>Regístrate</span></p>

          <button id='btnVolver' onClick={() => navigate('/')}>
            ← Volver
          </button>
        </div>
      </main>
    </div>
  )
}

export default Login