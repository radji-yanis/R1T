import AutocompleteAdress from "../../components/AutocompleteAdress/AutocompleteAdress";
import GeolocationSlider from "../../components/GeolocationSlider/GeolocationSlider";

import styles from "./Geolocation.module.css";

export default function Geolocation() {
    return <>
        <div className={styles.form}>
            <label className={styles.label}>
                Adresse
                <AutocompleteAdress />
            </label>
            <label className={styles.label}  data-base-ui-swipe-ignore style={{ touchAction: 'pan-y', position: 'relative' }}>
                Dans un rayon de
                <GeolocationSlider />
            </label>
        </div>
    </>
}