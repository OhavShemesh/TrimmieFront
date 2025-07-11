import { BrowserRouter } from "react-router-dom"
import Layout from "./display/layout/Layout"
import Router from "./display/router/Router"
import { SnackProvider } from "./helpers/snack/useSnack"

function App() {

  return (
    <BrowserRouter>
      <SnackProvider>
        <Layout>
          <Router />
        </Layout>
      </SnackProvider>
    </BrowserRouter>
  )
}

export default App
