import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar/Navbar.jsx";

import Recherche from "./pages/Recherche.jsx";
import Test from "./pages/Test.jsx";
// import MesMatchs from "./pages/MesMatchs.jsx";

function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<Recherche />} />
      <Route path="/test" element={<Test />} />
      {/* <Route path="/mes-matchs" element={<MesMatchs />} /> */}
    </Routes>

    <Navbar />
  </>
  );
}

export default App
