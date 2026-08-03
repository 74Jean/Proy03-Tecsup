import './heroSearch.css'

interface HeroSearchProps {
  busqueda: string
  setBusqueda: (valor: string) => void
}

const HeroSearch = ({ busqueda, setBusqueda }: HeroSearchProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value)    
  }

  return (
    <section className='heroSearch'>
      <div id='heroContent'>
        <h1>Busca lo que necesitas... los mejores celulares al mejor precio</h1>

        <div id='searchBox'>
          <span id='searchIcon'>🔍</span>
          <input
            type="text"
            placeholder='Busca tu celular ideal...'
            value={busqueda}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSearch