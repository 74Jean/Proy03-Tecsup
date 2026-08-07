import { Route, Routes} from "react-router-dom"
import Home from "../pages/home/Home"
import Registro from "../pages/registro/Registro"
import PhoneDetail from "../pages/phoneDetail/PhoneDetail"
import Login from "../pages/login/Login"
import Cart from "../pages/cart/Cart"
import Faq from "../pages/faq/Faq"
import Terms from "../pages/terms/Terms"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/phone/:id" element={<PhoneDetail />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/preguntas-frecuentes" element={<Faq />} />
      <Route path="/terminos-y-condiciones" element={<Terms />} />
    </Routes>
  )
}

export default AppRoutes