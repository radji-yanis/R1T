import styles from "./Header.module.css";

import logo from "../../assets/logo-r1t.svg";

export default function Header({ titre, authPage = false }) {
    return <header className={styles.header}>
        <img className={`${styles.header_logo} ${authPage ? styles.authPage : ""}`} src={logo} alt="R1T"/>
        <h1 className={`${authPage ? "h2-min centered" : ""}`} >{titre}</h1>
    </header>;
}