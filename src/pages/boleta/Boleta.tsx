import { useLocation, useNavigate } from 'react-router-dom'
import type { CartItem } from '../../shared/store/useCartStore'
import './boleta.css'

interface BoletaState {
    items: CartItem[]
    total: number
}

const Boleta = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state as BoletaState | null

    if (!state) {
        return (
            <div className='boleta'>
                <p>No hay ninguna compra para mostrar.</p>
                <button onClick={() => navigate('/')}>Volver al inicio</button>
            </div>
        )
    }

    const { items, total } = state

    return (
        <div className='boleta'>
            <div id='boletaContainer'>
                <h1>¡Compra realizada!</h1>
                <p id='boletaSubtitle'>Gracias por tu compra en Phone Market</p>

                <div id='boletaItemsList'>
                    {items.map((item) => (
                        <div key={item.id} className='boletaItem'>
                            <img src={item.image} alt={item.name} />

                            <div className='boletaItemInfo'>
                                <p className='boletaItemName'>{item.name}</p>
                                <p className='boletaItemQuantity'>Cantidad: {item.quantity}</p>
                            </div>

                            <p className='boletaItemSubtotal'>
                                S/ {(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>

                <div id='boletaTotal'>
                    <span>Total pagado</span>
                    <h2>S/ {total.toFixed(2)}</h2>
                </div>

                <button id='btnVolverHome' onClick={() => navigate('/')}>
                    Volver al inicio
                </button>
            </div>
        </div>
    )
}

export default Boleta