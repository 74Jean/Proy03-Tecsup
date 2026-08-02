import AppRoutes from "./router/AppRoutes"
import { BrowserRouter } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />    
    </BrowserRouter>    
  )
}

export default App