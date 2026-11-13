import { NavLink } from "react-router";

import styles from "./NavTabs.module.css";

export default function NavTabs() {
    return <div className={styles.navTabs}>
        <NavLink 
            to="/inscription"
            className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
            }
        >
            Inscription
        </NavLink>
        <NavLink 
            to="/connexion"
            className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
            }
        >
            Connexion
        </NavLink>
    </div>
}