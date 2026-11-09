import { NavLink } from "react-router";
import rechercheIcon from "../assets/Recherche.svg";
import matchsIcon from "../assets/Matchs.svg";
import profilIcon from "../assets/Profil.svg";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${styles.navbarItem} ${isActive ? styles.active : ""}`
        }
      >
        <img src={rechercheIcon} alt="" />
        <span>Recherche</span>
      </NavLink>

      <NavLink
        to="/mes-matchs"
        className={({ isActive }) =>
          `${styles.navbarItem} ${isActive ? styles.active : ""}`
        }
      >
        <img src={matchsIcon} alt="" />
        <span>Mes matchs</span>
      </NavLink>

      <NavLink
        to="/mon-profil"
        className={({ isActive }) =>
          `${styles.navbarItem} ${isActive ? styles.active : ""}`
        }
      >
        <img src={profilIcon} alt="" />
        <span>Profil</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;
