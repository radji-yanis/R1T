import styles from "./DetailsMatch.module.css";

export default function DetailsMatch(props) {
    const { date_heure, description, format, id, inscrits, lieu, titre, nb_inscrits } = props;

    function formatDate(date) {
        date = new Date(date);
        const jour = String(date.getDate()).padStart(2, '0');
        const mois = String(date.getMonth() + 1).padStart(2, '0');
        const heures = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${jour}/${mois} - ${heures}h${minutes}`;
    }

    const cleanFormat = {
        "foot5": [ <>5<span className={styles.card_versus}>v</span>5</>, 10 ],
        "foot7": [ <>7<span className={styles.card_versus}>v</span>7</>, 14 ],
        "foot11": [ <>11<span className={styles.card_versus}>v</span>11</>, 22 ]
    }

    return (
        <div>
            <div className={styles.details_top}>
                <div className={styles.details_topLeft}>
                    <h2 className="h2">{titre}</h2>
                    <p className={styles.details_subTitle}>{lieu}<br/> {formatDate(date_heure)}</p>
                </div>  
                <div className={styles.details_topRight}>
                    <span className={styles.details_format}>{cleanFormat[format][0]}</span>
                </div>
            </div>
            <div className={styles.details_description}>
                <h3 className="h3">Description</h3>
                <p>{description}</p>
            </div>
            <h3 className="h3">Inscrits ({nb_inscrits}/{cleanFormat[format][1]})</h3>
            <div>
                { inscrits.map(inscrit => <span key={inscrit.id}>{inscrit.pseudo}</span>) }
            </div>
        </div>
    );
}