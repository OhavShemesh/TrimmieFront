import { Routes, Route } from "react-router-dom";
import ROUTES from "./routesModule";
import HomePageManager from "../pages/managers/HomePageManager";
import BarberPageManager from "../pages/managers/BarberPageManager";

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePageManager />} />
      <Route path={ROUTES.BARBER} element={<BarberPageManager />} />
    </Routes>
  );
}
