import styles from "./Button.module.css";

export default function Button(props) {
    const { children, onClick, disabled = false } = props;

    return <button className={styles.button} onClick={onClick} disabled={disabled}>{children}</button>
}