import type { FC } from 'react'

import './phoneCard.css'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../../../../shared/store/useUserStore'
import useCartStore from '../../../../shared/store/useCartStore'

interface PhoneCardProps {
    id: number 
    titulo: string
    marca: string
    precio: number
    descuento: number
    rating: number
    stock: number
    imagen_url: string
}

const PhoneCard: FC<PhoneCardProps> = ({
    id,
    titulo,
    marca,
    precio,
    descuento,
    rating,
    stock,
    imagen_url
}: PhoneCardProps) => {

    const navigate = useNavigate()
    const {addItem} = useCartStore()
    const { user } = useUserStore()

    const precioConDescuento = precio - (precio * descuento / 100)

    const handleClick = () => {
        navigate(`/phone/${id}`)
    }

    const handleAddToCard = (e: React.MouseEvent) => {
        e.stopPropagation()

        if (!user) {
            navigate('/login', { state: { from: location.pathname } })
            return
        }

        addItem({
            id,
            name: titulo,
            price: precioConDescuento,
            image: imagen_url,
            stock            
        })
        
    }

    return (
        <div className='phoneCard' onClick={handleClick}>
            <div id='cardImage'>
                {descuento > 0 && (
                    <span id='discountBadge'>-{Math.round(descuento)}%</span>
                )}
                <img src={imagen_url} alt={titulo} />
            </div>

            <div id='cardInfo'>
                <p id='cardBrand'>{marca}</p>
                <p id='cardTitle'>{titulo}</p>

                <div id='cardRating'>
                    <span>⭐ {rating.toFixed(1)}</span>
                </div>

                <p id='cardStock'>
                    {stock > 0 ? `${stock} disponibles` : 'Agotado'}
                </p>
            </div>

            <div id='cardFooter'>
                <div id='cardPrice'>
                    {descuento > 0 && (
                        <span id='oldPrice'>S/ {precio.toFixed(2)}</span>
                    )}
                    <h4>S/ {precioConDescuento.toFixed(2)}</h4>
                </div>

                {stock > 0 ? (
                    <button id='btnAddCart' onClick={handleAddToCard}>
                        Agregar
                    </button>
                ) : (
                    <p id='sinStockMsg'>Sin stock disponible</p>
                )}
            </div>
        </div>
    )
}

export default PhoneCard