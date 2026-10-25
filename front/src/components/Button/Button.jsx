import styles from "./Button.module.css";

export default function Button(props) {
    const { children, isSecondary, onClick, disabled = false } = props;

    return <button className={`${styles.button} ${isSecondary ? styles.secondary : ''}`} onClick={onClick} disabled={disabled}>{children}</button>
}