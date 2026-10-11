import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
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
            <div className={styles.subscribed} data-base-ui-swipe-ignore style={{ touchAction: 'pan-y' }}>
                <Swiper
                    className={styles.subscribed_swiper}
                    modules={[FreeMode]}
                    freeMode={{
                        enabled: true,
                        momentum: true,
                        momentumBounce: true,
                        momentumBounceRatio: 1.5
                    }}
                    spaceBetween={10}
                    slidesPerView={'auto'}
                    >    
                    { inscrits.map(inscrit => 
                        <SwiperSlide key={inscrit.id} className={styles.subscribed_card}>
                            <div className={styles.subscribed_avatar}>
                                {inscrit.avatar_id}
                            </div>
                            <span className={styles.subscribed_pseudo}>{inscrit.pseudo}</span>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    );
}