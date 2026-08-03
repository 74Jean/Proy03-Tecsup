import { useEffect, useState } from "react"
import Filters from "./components/filters/Filters"
import HeaderPublic from "./components/header/HeaderPublic"
import HeroSearch from "./components/heroSearch/HeroSearch"
import PhoneCard from "./components/phoneCard/PhoneCard"
import './home.css'
import type {  Phone } from "../../module/dataJson"
import { getPhones } from "../../services/dataServices"

const Home = () => {  
  const [phones, setPhones] = useState<Phone[]>([])

  const [busqueda, setBusqueda] = useState('')
  const [marcaSeleccionadas, setMarcasSeleccionadas] = useState<string[]>([])
  const [precioMin, setPrecioMin] = useState('')
  const [precioMax, setPrecioMax] = useState('')
  const [ratingMinimo, setRatingMinimo] = useState(0)
  const [soloEnStock, setSoloEnStock] = useState(false)
  const [soloConDescuento, setSoloConDescuento] = useState(false)

  const limpiarFiltros = () => {
    setBusqueda('')
    setMarcasSeleccionadas([])
    setPrecioMin('')
    setPrecioMax('')
    setRatingMinimo(0)
    setSoloEnStock(false)
    setSoloConDescuento(false)
  }

  useEffect(() => {
    const cargarPhones = async () => {
      const data = await getPhones()
      setPhones(data)
    }
    cargarPhones()
  }, [])

  const marcasDisponibles = [...new Set(phones.map((phone) => phone.brand))]

  const toggleMarca = (marca:string) => {
    setMarcasSeleccionadas((prev) => {
      if (prev.includes(marca)) {
        return prev.filter((m) => m !== marca)
      } else {
        return [...prev, marca]
      }
    })
  }

  const phonesFiltrados = phones.filter((phone) => {
    const textoBusqueda = busqueda.toLowerCase()

    const coincideBusqueda = 
      phone.title.toLowerCase().includes(textoBusqueda) ||
      phone.brand.toLowerCase().includes(textoBusqueda)

    const coincideMarca = 
      marcaSeleccionadas.length === 0 ||
      marcaSeleccionadas.includes(phone.brand)

    const coincidePrecio = 
      (precioMin === '' || phone.price >= Number(precioMin)) &&
      (precioMax === '' || phone.price <= Number(precioMax))

    const coincideRaiting = phone.rating >= ratingMinimo

    const coincideDisponibilidad = !soloEnStock || phone.stock > 0
    const coincideDescuento = !soloConDescuento || phone.discountPercentage > 0

    return coincideBusqueda && coincideMarca && coincidePrecio && coincideRaiting && coincideDisponibilidad && coincideDescuento
  })

  return (
    <div className='home'>
      <HeaderPublic />
      <HeroSearch busqueda={busqueda} setBusqueda={setBusqueda} />

      <div id='mainContent'>
        <Filters 
          marcasDisponibles={marcasDisponibles}
          marcasSeleccionadas={marcaSeleccionadas}
          toggleMarca={toggleMarca}

          precioMin={precioMin}   
          setPrecioMin={setPrecioMin} 
          precioMax={precioMax}   
          setPrecioMax={setPrecioMax} 

          ratingMinimo={ratingMinimo}       
          setRatingMinimo={setRatingMinimo} 

          soloEnStock={soloEnStock}
          setSoloEnStock={setSoloEnStock}

          soloConDescuento={soloConDescuento}
          setSoloConDescuento={setSoloConDescuento}
          
          limpiarFiltros={limpiarFiltros} 
        />

        <div id='catalogGrid'>
          {
            phonesFiltrados.map((phone) => (
              <PhoneCard 
                key={phone.id}
                id={phone.id}
                titulo={phone.title}
                marca={phone.brand}
                precio={phone.price}
                descuento={phone.discountPercentage}
                rating={phone.rating}
                stock={phone.stock}
                imagen_url={phone.thumbnail}
              />
            ))
          }            
        </div>
      </div>
      
    </div>
  )
}

export default Home