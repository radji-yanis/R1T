import styles from "./Field.module.css";

export default function Field({ id, label, error, children = null, ...props }) {
  return (
    <div className={styles.field}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        {children ? children :
            <input
                id={id}
                name={id}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                {...props}
            />
        }
        {error && <p className={styles.error} id={`${id}-error`}>{error}</p>}
    </div>
  );
}