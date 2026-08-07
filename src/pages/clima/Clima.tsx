import { useEffect, useState } from 'react'
import './clima.css'
import { getClima } from '../../services/dataServices'
import type { CurrentWeather } from '../../module/dataJson'

const Clima = () => {

    const [clima, setClima] = useState<CurrentWeather | null>(null)
    const [ahora, setAhora] = useState(new Date()) // 👈 nuevo
    const nombresMeses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]

  useEffect(() => {
      const cargarClima = async () => {
          const data = await getClima()
          setClima(data)
      }
      cargarClima()
  }, [])

  useEffect(() => {
      const intervalo = setInterval(() => {
          setAhora(new Date())
      }, 1000)

      return () => clearInterval(intervalo)
  }, [])

  if (!clima) return <p>Cargando clima...</p>

  const hora = ahora.getHours()
  const minutos = ahora.getMinutes()
  const segundos = ahora.getSeconds()

  const horaLet = hora >= 12 ? 'PM' : 'AM'

  const dia = ahora.getDate()
  const mes = ahora.getMonth()
  const anio = ahora.getFullYear()

  const mesNombre = nombresMeses[mes]

  return (
    <div className='climaWidget'>
      <div className='climaLeft'>
        <p id='climaUbicacion'>📍 Lima, Perú</p>

        <p id='climaHora'>
          <span id='hora'>{hora}:{minutos}:{segundos}</span>
          <span id='horaLetra'>{horaLet}</span>
        </p>

        <p id='climaFecha'>{dia}, {mesNombre} del {anio}</p>
      </div>

      <div className='climaRight'>
        <span id='climaTemp'>{clima.temperature}°C</span>
      </div>
    </div>    
  )
}

export default Clima