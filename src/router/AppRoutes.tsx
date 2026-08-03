import { Route, Routes} from "react-router-dom"
import Home from "../pages/home/Home"
import Registro from "../pages/registro/Registro"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registro" element={<Registro />} />

    </Routes>
  )
}

export default AppRoutes