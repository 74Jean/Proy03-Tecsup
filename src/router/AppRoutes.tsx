import { Route, Routes} from "react-router-dom"
import Home from "../pages/home/Home"
import Registro from "../pages/registro/Registro"
import PhoneDetail from "../pages/phoneDetail/PhoneDetail"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/phone/:id" element={<PhoneDetail />} />
      <Route path="/registro" element={<Registro />} />

    </Routes>
  )
}

export default AppRoutes