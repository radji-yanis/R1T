import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import BottomDrawer from "../BottomDrawer/BottomDrawer";
import Button from "../Button/Button";
import { useToast } from "../ToastNotification/ToastNotification"

import { formatDate } from '../../utils';

import { getRencontreById } from '../../api/rencontres';

import 'swiper/css';
import 'swiper/css/free-mode';
import styles from "./MatchDrawer.module.css";

const cleanFormats = {
    "foot5": [ <>5<span className={styles.card_versus}>v</span>5</>, 10 ],
    "foot7": [ <>7<span className={styles.card_versus}>v</span>7</>, 14 ],
    "foot11": [ <>11<span className={styles.card_versus}>v</span>11</>, 22 ]
}

export default function MatchDrawer({ openedDrawer, setOpenedDrawer, detailedMatchId, setDetailedMatchId }) {
    
    const [details, setDetails] = useState(false);
    const toast = useToast();

    const stickyFooter = (
        <Button onClick={() => toast.success(`inscription au match ${detailedMatchId}`)}>Inscription</Button>
    )

    useEffect(() => {
        if(detailedMatchId === null)
            return;

        (async () => {
            try {
                const data = await getRencontreById(detailedMatchId);
                setDetails(data);
            } catch (error) {
                console.log(error)
            } finally {
                setOpenedDrawer(true);
            }
        })()
    }, [detailedMatchId]);

    useEffect(() => {
        if(!openedDrawer && detailedMatchId !== null)
            setDetailedMatchId(null);
    }, [openedDrawer]);
 
    return (
        <BottomDrawer open={openedDrawer} setOpen={setOpenedDrawer} stickyFooter={stickyFooter}>
            {details && 
                <div>
                    <div className={styles.details_top}>
                        <div className={styles.details_topLeft}>
                            <h2 className="h2">{details.titre}</h2>
                            <p className={styles.details_subTitle}>{details.lieu}<br/> {formatDate(details.date_heure)}</p>
                        </div>  
                        <div className={styles.details_topRight}>
                            <span className={styles.details_format}>{cleanFormats[details.format][0]}</span>
                        </div>
                    </div>
                    <div className={styles.details_description}>
                        <h3 className="h3">Description</h3>
                        <p>{details.description}</p>
                    </div>
                    <h3 className="h3">Inscrits ({details.nb_inscrits}/{cleanFormats[details.format][1]})</h3>
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
                            { details.inscrits.map(inscrit => 
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
            }
        </BottomDrawer>
    );
}