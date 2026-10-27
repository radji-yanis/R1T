import styles from "./Button.module.css";

export default function Button(props) {
    const { children, style, isSecondary, onClick, disabled = false } = props;

    return <button className={`${styles.button} ${isSecondary ? styles.secondary : ''}`} style={style} onClick={onClick} disabled={disabled}>{children}</button>
}