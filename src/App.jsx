import { BrowserRouter } from "react-router-dom"
import Layout from "./display/layout/Layout"
import Router from "./display/router/Router"

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  )
}

export default App
