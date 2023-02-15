import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Events from "../pages/Events";
import Quests from "../pages/Quests";
import Games from "../pages/Games";
import Attractions from "../pages/Attractions";
import EventSubscribe from "../pages/EventSubscribe";
import Registrations from "../pages/Registrations";
import Profile from "../pages/Profile";
import Panel from "../pages/Panel";

import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/quests" element={<Quests />} />
      {/* <Route path="/games" element={<Games />} /> */}
      <Route path="/attractions" element={<Attractions />} />
      <Route path="/event-subscribe" element={<EventSubscribe />} />
      <Route path="/registrations" element={<Registrations />} />
      <Route path="/me/:username" element={<Profile />} />
      <Route path="/panel" element={<Panel />} />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRoutes;
