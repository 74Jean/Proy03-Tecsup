import { Route, Routes} from "react-router-dom"
import Home from "../pages/home/Home"
import Registro from "../pages/registro/Registro"
import PhoneDetail from "../pages/phoneDetail/PhoneDetail"
import Login from "../pages/login/Login"
import Cart from "../pages/cart/Cart"
import Preguntas from "../pages/preguntas/Preguntas"
import Terms from "../pages/terms/Terms"
import RutaPrivada from "../pages/RutaPrivada"
import Error404 from "../pages/error/Error404"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/phone/:id" element={<PhoneDetail />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/preguntas-frecuentes" element={<Preguntas />} />
      <Route path="/terminos-y-condiciones" element={<Terms />} />


      <Route element={<RutaPrivada />}>
        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route path='*' element={<Error404 />} />
    </Routes>
  )
}

export default AppRoutes