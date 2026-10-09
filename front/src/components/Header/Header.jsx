import styles from "./Header.module.css";

export default function Header({titre}) {
    return <header className={styles.header}>
        <h1>{titre}</h1>
    </header>;
}