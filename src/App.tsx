import AppRoutes from "./router/AppRoutes"
import { BrowserRouter } from "react-router-dom"
import WhatsappButton from "./shared/components/whatsappButton/whatsappButton"

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <WhatsappButton />     
    </BrowserRouter>    
  )
}

export default App