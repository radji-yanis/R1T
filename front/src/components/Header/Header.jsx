import styles from "./Header.module.css";

import logo from "../../assets/logo-r1t.svg";

export default function Header({titre}) {
    return <header className={styles.header}>
        <img className={styles.header_logo} src={logo} alt="R1T"/>
        <h1>{titre}</h1>
    </header>;
}