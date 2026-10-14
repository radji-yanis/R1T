import { useState } from 'react'


import AutocompleteAdress from "../../components/AutocompleteAdress/AutocompleteAdress";
import GeolocationSlider from "../../components/GeolocationSlider/GeolocationSlider";

import styles from "./Geolocation.module.css";

export default function Geolocation(props) {
    const { cityValue, setCityValue, radiusValue, setRadiusValue } = props;

    return <>
        <div className={styles.form}>
            <label className={styles.label}>
                Adresse
                <AutocompleteAdress cityValue={cityValue} setCityValue={setCityValue} />
            </label>
            <label className={styles.label}  data-base-ui-swipe-ignore style={{ touchAction: 'pan-y', position: 'relative' }}>
                Dans un rayon de
                <GeolocationSlider radiusValue={radiusValue} setRadiusValue={setRadiusValue} />
            </label>
        </div>
    </>
}