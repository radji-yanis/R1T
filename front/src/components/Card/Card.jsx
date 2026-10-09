import { Link } from "react-router";
import styles from './Card.module.css';

export default function Card(props) {
    const {id, titre, lieu, format, statut, date_heure, nb_inscrits} = props;

    function formatDate(date) {
        date = new Date(date);
        const jour = String(date.getDate()).padStart(2, '0');
        const mois = String(date.getMonth() + 1).padStart(2, '0');
        const heures = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${jour}/${mois} - ${heures}h${minutes}`;
    }

    const cleanFormat = {
        "foot5": [ "5v5", 10 ],
        "foot7": [ "7v7", 14 ],
        "foot11": [ "11v11", 22 ]
    }
    const progressPercent = nb_inscrits * 100 / cleanFormat[format][1];

    let statusColor = "var(--light-grey)";
    if(progressPercent < 66) {
        statusColor = "var(--calm)";
    } else if(progressPercent < 100) {
        statusColor = "var(--danger)";
    }

    const p = Math.max(0, Math.min(100, progressPercent));
    const hue = 240 - (p * 2.4);
    // const statusColor =  `hsl(${hue}, 100%, 40%)`;
    
    return <div className={styles.card} style={{ opacity: statut === "annulee" ? 0.5 : 1 }}>
        <div className={styles.card_top}>
            <div className={styles.card_topLeft}>
                <h2 className="h3">{titre}</h2>
                <span className={styles.card_subTitle}>{lieu}</span>
            </div>
            <div className={styles.card_topRight}>
                <span className={styles.card_format}>{cleanFormat[format][0]}</span>
            </div>
        </div>
        <div className={styles.card_content}>
            <span className={styles.card_dateHeure}>{formatDate(date_heure)}</span>
            <span className={styles.card_nbInscrits}>{nb_inscrits} / {cleanFormat[format][1]} joueurs</span>
        </div>
        <div className={styles.card_progress}>
            <div className={styles.card_progressBar} style={{width: progressPercent + '%', backgroundColor: statusColor}}></div>
        </div>
        {/* { statut !== "annulee" &&
            <Link to={`/match/${id}`} className={styles.card_link}></Link>
        } */}
    </div>;
}