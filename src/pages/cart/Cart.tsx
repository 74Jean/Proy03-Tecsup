import { useNavigate } from 'react-router-dom'
import HeaderPublic from '../home/components/header/HeaderPublic'
import HeaderUser from '../home/components/header/HeaderUser'
import useUserStore from '../../shared/store/useUserStore'
import useCartStore from '../../shared/store/useCartStore'
import './cart.css'

const Cart = () => {
    const { user } = useUserStore()
    const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore()
    const navigate = useNavigate()

    const handleCantidad = (id: number, cantidad: number) => {
        if (cantidad < 1) return
        updateQuantity(id, cantidad)
    }

    const handleConfirmarCompra = () => {
        navigate('/boleta', {
            state: {
                items: items,
                total: totalPrice()
            }
        })
        clearCart()
    }

    return (
        <div className='cartPage'>
            {user ? <HeaderUser /> : <HeaderPublic />}

            <main>
                <button id='btnVolver' onClick={() => navigate(-1)}>
                    ← Volver
                </button>

                <h1 id='cartTitle'>Mi carrito</h1>

                {items.length === 0 ? (
                    <div id='cartEmpty'>
                        <p>Tu carrito está vacío</p>
                        <button id='btnGoShopping' onClick={() => navigate('/')}>
                            Ir a la tienda
                        </button>
                    </div>
                ) : (
                    <div id='cartContent'>
                        <div id='cartItemsList'>
                            {items.map((item) => (
                                <div key={item.id} className='cartItem'>
                                    <img src={item.image} alt={item.name} className='cartItemImage' />

                                    <div className='cartItemInfo'>
                                        <p className='cartItemName'>{item.name}</p>
                                        <p className='cartItemPrice'>S/ {item.price.toFixed(2)}</p>
                                    </div>

                                    <div className='cartItemQuantity'>
                                         <button onClick={() => handleCantidad(item.id, item.quantity - 1)}>−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleCantidad(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.stock}>+</button>
                                    </div>
                                    {item.quantity >= item.stock && (
                                        <p className='cartItemMaxStock'>Máximo disponible</p>
                                    )}

                                    <p className='cartItemSubtotal'>
                                        S/ {(item.price * item.quantity).toFixed(2)}
                                    </p>

                                    <button
                                        className='btnRemoveItem'
                                        onClick={() => removeItem(item.id)}
                                        aria-label='Eliminar producto'
                                    >
                                        🗑
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div id='cartSummary'>
                            <div id='cartSummaryRow'>
                                <span>Total</span>
                                <h2>S/ {totalPrice().toFixed(2)}</h2>
                            </div>

                            <button id='btnCheckout' onClick={handleConfirmarCompra}>
                                Confirmar compra
                            </button>

                            <button id='btnClearCart' onClick={clearCart}>
                                Vaciar carrito
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Cart