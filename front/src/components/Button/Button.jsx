import styles from "./Button.module.css";

export default function Button({ children, style, isSecondary, onClick, disabled = false, ...props }) {
    return <button className={`${styles.button} ${isSecondary ? styles.secondary : ''}`} style={style} onClick={onClick} disabled={disabled} {...props}>{children}</button>
}