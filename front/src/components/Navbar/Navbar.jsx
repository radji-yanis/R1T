import { NavLink } from "react-router";
import rechercheIcon from "./icons/Recherche.svg";
import matchsIcon from "./icons/Matchs.svg";
import profilIcon from "./icons/Profil.svg";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `navbar-item ${isActive ? "active" : ""}`}
      >
        <img src={rechercheIcon} alt="" />
        <span>Recherche</span>
      </NavLink>

      <NavLink
        to="/mes-matchs"
        className={({ isActive }) => `navbar-item ${isActive ? "active" : ""}`}
      >
        <img src={matchsIcon} alt="" />
        <span>Mes matchs</span>
      </NavLink>

      <NavLink
        to="/profil"
        className={({ isActive }) => `navbar-item ${isActive ? "active" : ""}`}
      >
        <img src={profilIcon} alt="" />
        <span>Profil</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;
