import { useState } from 'react'

import BottomDrawer from "../BottomDrawer/BottomDrawer";
import AutocompleteAdress from "../../components/AutocompleteAdress/AutocompleteAdress";
import GeolocationSlider from "../../components/GeolocationSlider/GeolocationSlider";
import Button from "../Button/Button";

import styles from "./GeolocationDrawer.module.css";

const DEFAULT_RADIUS = 20;

export default function GeolocationDrawer({ setLocationValue, openedGeolocationDrawer, setOpenedGeolocationDrawer }) {
    const [cityValue, setCityValue] = useState([]);
    const [radiusValue, setRadiusValue] = useState(DEFAULT_RADIUS);

    const applyLocation = () => {
        setLocationValue([
            cityValue,
            radiusValue
        ]);
        setOpenedGeolocationDrawer(false);
    }

    const stickyFooter = <>
        {/* <Button disabled={cityValue.length === 0} onClick={applyLocation}>Appliquer</Button> */}
        <Button onClick={applyLocation}>Appliquer</Button>
    </>;
 
    return (
        <BottomDrawer open={openedGeolocationDrawer} setOpen={setOpenedGeolocationDrawer} stickyFooter={stickyFooter}>
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
        </BottomDrawer>
    );
}