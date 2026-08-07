import { useNavigate } from 'react-router-dom'
import './error404.css'

const Error404 = () => {
    const navigate = useNavigate()

    return (
        <div className='error404'>
            <div id='error404Container'>
                <h1>404</h1>
                <p>Ups, esta página no existe</p>
                <button onClick={() => navigate('/')}>
                    Volver al inicio
                </button>
            </div>
        </div>
    )
}

export default Error404