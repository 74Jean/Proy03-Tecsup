import { useState, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import '../registro/registro.css'

interface Usuario {
  nombre: string
  apellido: string
  usuario: string
  password: string
}

const Registro = () => {

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const registrarUsuario = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formulario = e.currentTarget
    const formData = new FormData(formulario)
    const data = Object.fromEntries(formData) as {
      nombre: string
      apellido: string
      usuario: string
      password: string
      confirmPassword: string
    }

    if (!data.nombre || !data.apellido || !data.usuario || !data.password || !data.confirmPassword) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (data.password !== data.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (data.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    const usuariosGuardados: Usuario[] = JSON.parse(
      localStorage.getItem('usuarios') || '[]'
    )

    const usuarioExiste = usuariosGuardados.some(
      (u) => u.usuario === data.usuario
    )

    if (usuarioExiste) {
      setError('Ese usuario ya existe, elige otro')
      return
    }

    const nuevoUsuario: Usuario = {
      nombre: data.nombre,
      apellido: data.apellido,
      usuario: data.usuario,
      password: data.password
    }

    usuariosGuardados.push(nuevoUsuario)
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados))

    setError('')
    formulario.reset()

    navigate("/login");
  }


  return (
    <div className='registro'>
      <header>
        <p id='headTitle'><span>Phone</span> <span>Market</span></p>
      </header>

      <main>
        <div id='registroContainer'>
          <div id='registroHeader'>
            <h2>Crea tu cuenta</h2>
            <p>Completa tus datos para comenzar</p>
          </div>

          <form action="" onSubmit={registrarUsuario}>
            <div className='inputGroup'>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name='nombre' />
            </div>

            <div className='inputGroup'>
              <label htmlFor="apellido">Apellido</label>
              <input type="text" id="apellido" name='apellido' />
            </div>

            <div className='inputGroup'>
              <label htmlFor="usuario">Usuario</label>
              <input type="text" id="usuario" name='usuario' />
            </div>

            <div className='inputGroup'>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name='password' />
            </div>

            <div className='inputGroup'>
              <label htmlFor="confirmPassword">Confirmar password</label>
              <input type="password" id="confirmPassword" name='confirmPassword' />
            </div>

            <p className='errorText'>{error}</p>

            <button id='btnRegistro' type='submit'>Crear cuenta</button>
          </form>

          <p id='volverText'>¿Ya tienes cuenta? <span onClick={() => navigate('/login')}>Inicia sesión</span></p>
        </div>
      </main>
    </div>
  )
}

export default Registro