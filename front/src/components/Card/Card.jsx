import styles from './Card.module.css';

export default function Card(props) {
    const {titre, lieu, format, statut, date_heure} = props;

    function formatDate(date) {
        date = new Date(date);
        const jour = String(date.getDate()).padStart(2, '0');
        const mois = String(date.getMonth() + 1).padStart(2, '0');
        const heures = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${jour}/${mois} - ${heures}h${minutes}`;
    }

    const nb_inscriptions = 7;
    const nb_places = 10;

    const progressPercent = nb_inscriptions * 100 / nb_places;
    let statusColor = ["complete", "annulee"].includes(statut) ? 'var(--grey)' : (progressPercent < 70 ? 'var(--green)' : 'var(--orange)');
    
    return <div className={styles.card} style={{ opacity: statut === "annulee" ? 0.75 : 1 }}>
        <div className={styles.card_top}>
            <div className={styles.card_topLeft}>
                <h2 className="h3">{titre}</h2>
                <span className={styles.card_subTitle}>{lieu}</span>
            </div>
            <div className={styles.card_topRight}>
                <span className={styles.card_format}>{format}</span>
            </div>
        </div>
        <div className={styles.card_content}>
            <span className={styles.card_dateHeure}>{formatDate(date_heure)}</span>
            <span className={styles.card_dateHeure}>{nb_inscriptions} / {nb_places} joueurs</span>
        </div>
        <div className={styles.card_progress}>
            <div className={styles.card_progressBar} style={{width: progressPercent + '%'}}></div>
        </div>
    </div>;
}