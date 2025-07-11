import { Routes, Route } from "react-router-dom";
import ROUTES from "./routesModule";
import HomePageManager from "../pages/managers/HomePageManager";
import BarberPageManager from "../pages/managers/BarberPageManager";
import BusinessBoardManager from "../../ADMIN/Managers/BusinessBoardManager";

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePageManager />} />
      <Route path={ROUTES.BARBER} element={<BarberPageManager />} />
      <Route path={`${ROUTES.ADMIN}/:id`} element={<BusinessBoardManager />} />
    </Routes>
  );
}
