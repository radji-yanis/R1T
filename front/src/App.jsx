import { Routes, Route } from "react-router";

import Recherche from "./pages/Recherche.jsx";
// import MesMatchs from "./pages/MesMatchs.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Recherche />} />
      {/* <Route path="/mes-matchs" element={<MesMatchs />} /> */}
    </Routes>
  );
}

export default App
