import styles from "./SimpleMessage.module.css";

export default function SimpleMessage(props) {
    const { content } = props;
    return <div className={styles.simpleMessage}>{content}</div>
}