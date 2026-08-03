import { useState } from "react"
import HeaderPublic from "./components/header/HeaderPublic"
import HeroSearch from "./components/heroSearch/HeroSearch"

const Home = () => {

  const [busqueda, setBusqueda] = useState('')

  return (
    <div>
      <HeaderPublic />
      <HeroSearch busqueda={busqueda} setBusqueda={setBusqueda} />

    </div>
  )
}

export default Home
