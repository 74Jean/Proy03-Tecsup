import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useUserStore from '../shared/store/useUserStore'

const RutaPrivada = () => {
    const { user } = useUserStore()
    const location = useLocation()

    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />
    }

    return <Outlet />
}

export default RutaPrivada