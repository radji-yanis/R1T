import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar/Navbar.jsx";

import Recherche from "./pages/Recherche.jsx";
import Test from "./pages/Test.jsx";
import MesMatchs from "./pages/MesMatchs.jsx";
import MonProfil from "./pages/MonProfil.jsx";
import Registration from "./pages/Registration.jsx";
import Connection from "./pages/Connection.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute/GuestRoute.jsx";

function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<ProtectedRoute><Recherche /></ProtectedRoute>} />
      <Route path="/test" element={<Test />} />
      <Route path="/mes-matchs" element={<ProtectedRoute><MesMatchs /></ProtectedRoute>} />
      <Route path="/mon-profil" element={<ProtectedRoute><MonProfil /></ProtectedRoute>} />
      <Route path="/inscription" element={<GuestRoute><Registration /></GuestRoute>} />
      <Route path="/connexion" element={<GuestRoute><Connection /></GuestRoute>} />
    </Routes>

    <Navbar />
  </>
  );
}

export default App
