import './filters.css'

interface FiltersProps {
  marcasDisponibles: string[]
  marcasSeleccionadas: string[]
  toggleMarca: (marca: string) => void

  precioMin: string
  setPrecioMin: (valor: string) => void
  precioMax: string
  setPrecioMax: (valor: string) => void

  ratingMinimo: number
  setRatingMinimo: (valor: number) => void

  soloEnStock: boolean
  setSoloEnStock: (valor: boolean) => void

  soloConDescuento: boolean
  setSoloConDescuento: (valor: boolean) => void

  limpiarFiltros: () => void
}

const Filters = ({ 
  marcasDisponibles, 
  marcasSeleccionadas, 
  toggleMarca,
  precioMin,
  setPrecioMin,
  precioMax,
  setPrecioMax,
  ratingMinimo,
  setRatingMinimo,
  soloEnStock,
  setSoloEnStock,
  soloConDescuento,
  setSoloConDescuento,
  limpiarFiltros 
}: FiltersProps) => {
  return (
    <aside className='filters'>
      <h2>Filtros</h2>

      <div className='filterGroup'>
        <h3>Marca</h3>
        {
          marcasDisponibles.map((marca) => (
            <label className='checkOption' key={marca}>
              <input 
                type="checkbox"
                checked={marcasSeleccionadas.includes(marca)}
                onChange={() => toggleMarca(marca)}                            
              />
              <span>{marca}</span>
            </label>            
          ))
        }
      </div>

      <div className='filterGroup'>
        <h3>Rango de precio</h3>
        <div className='priceInputs'>
          <input 
            type="number" 
            placeholder='Mín'
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder='Máx'
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
          />
        </div>
      </div>

      <div className='filterGroup'>
        <h3>Calificación mínima</h3>
        <label className='checkOption'>
          <input 
            type="radio" 
            name='rating'
            checked={ratingMinimo === 4}
            onChange={() => setRatingMinimo(4)}
          />
          <span>4 ★ o más</span>
        </label>
        <label className='checkOption'>
          <input 
            type="radio" 
            name='rating'
            checked={ratingMinimo === 3}
            onChange={() => setRatingMinimo(3)}          
          />
          <span>3 ★ o más</span>
        </label>
        <label className='checkOption'>
          <input 
            type="radio" 
            name='rating'
            checked={ratingMinimo === 0}
            onChange={() => setRatingMinimo(0)}
          />
          <span>Todas</span>
        </label>
      </div>

      <div className='filterGroup'>
        <h3>Disponibilidad</h3>
        <label className='checkOption'>
          <input 
            type="checkbox"
            checked={soloEnStock}
            onChange={() => setSoloEnStock(!soloEnStock)}
          />
          <span>Solo en stock</span>
        </label>
        <label className='checkOption'>
          <input 
            type="checkbox"
            checked={soloConDescuento}
            onChange={() => setSoloConDescuento(!soloConDescuento)}
          />
          <span>Solo con descuento</span>
        </label>
      </div>

      <button id='btnClearFilters' onClick={limpiarFiltros}>
        Limpiar filtros
      </button>

    </aside>
  )
}

export default Filters