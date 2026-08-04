import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import HeaderPublic from '../home/components/header/HeaderPublic'
import '../phoneDetail/phoneDetail.css'
import { getPhoneById } from '../../services/dataServices'
import type { Phone } from '../../module/dataJson'
import HeaderUser from '../home/components/header/HeaderUser'
import useUserStore from '../../shared/store/useUserStore'
import useCartStore from '../../shared/store/useCartStore'

const PhoneDetail = () => {
    const { user } = useUserStore()
    const addItem = useCartStore((state) => state.addItem)
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [phone, setPhone] = useState<Phone | null>(null)
    const [imagenSeleccionada, setImagenSeleccionada] = useState(0)

    useEffect(() => {
        const cargarPhone = async () => {
            if (!id) return

            const data = await getPhoneById(id)
            setPhone(data ?? null)
        }
        cargarPhone()
    }, [id])

    const handleVolver = () => {
        navigate(-1)
    }

    if (!phone) return <p>Cargando...</p>

    const precioConDescuento = phone.price - (phone.price * phone.discountPercentage / 100)

    const agregarAlCarrito = () => {
        if (!user) {
            navigate('/login', { state: { from: location.pathname } })
            return
        }

        addItem({
            id: phone.id,
            name: phone.title,
            price: precioConDescuento,
            image: phone.thumbnail,
            stock: phone.stock,
        })
    }

    const handleAddToCart = () => {
        agregarAlCarrito()
    }

    const handleBuyNow = () => {
        if (!user) {
            navigate('/login', { state: { from: location.pathname } })
            return
        }
        agregarAlCarrito()
        navigate('/cart')
    }

    return (
        <div className='phoneDetail'>
            {user ? <HeaderUser /> : <HeaderPublic />}
            <main>
                <div id='gallerySection'>
                    <div id='mainImage'>
                        <img src={phone.images[imagenSeleccionada]} alt={phone.title} />
                    </div>

                    <div id='thumbnailsRow'>
                        {phone.images.map((img, index) => (
                            <div
                                key={index}
                                className={`thumbnail ${index === imagenSeleccionada ? 'thumbnailActive' : ''}`}
                                onClick={() => setImagenSeleccionada(index)}
                            >
                                <img src={img} alt={`${phone.title} ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <button id='btnVolver' onClick={handleVolver}>
                        ← Volver
                    </button>
                </div>

                <div id='infoSection'>
                    <p id='detailBrand'>{phone.brand}</p>
                    <h1 id='detailTitle'>{phone.title}</h1>

                    <div id='detailRating'>
                        <span>⭐ {phone.rating.toFixed(1)}</span>
                    </div>

                    <p id='detailDescription'>{phone.description}</p>

                    <p id='detailStock'>
                        {phone.stock > 0 ? `${phone.stock} disponibles` : 'Agotado'}
                    </p>

                    <div id='priceBox'>
                        <div id='priceRow'>
                            <span>Total</span>
                            <div id='priceValues'>
                                <h2>S/ {precioConDescuento.toFixed(2)}</h2>
                                {phone.discountPercentage > 0 && (
                                    <div id='priceDiscountInfo'>
                                        <span id='discountText'>
                                            Ahorra S/ {(phone.price - precioConDescuento).toFixed(2)}
                                        </span>
                                        <span id='oldPriceDetail'>S/ {phone.price.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button id='btnBuyNow' onClick={handleBuyNow} disabled={phone.stock === 0}>
                            Comprar ahora
                        </button>
                        <button id='btnBuyNow' onClick={handleAddToCart} disabled={phone.stock === 0}>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PhoneDetail