import BottomDrawer from "../BottomDrawer/BottomDrawer";
import AutocompleteAdress from "../../components/AutocompleteAdress/AutocompleteAdress";
import GeolocationSlider from "../../components/GeolocationSlider/GeolocationSlider";
import Button from "../Button/Button";

import styles from "./GeolocationDrawer.module.css";

export default function GeolocationDrawer({ cityValue, setCityValue, radiusValue, setRadiusValue, openedGeolocationDrawer, setOpenedGeolocationDrawer }) {

    const stickyFooter = (
        <Button disabled={cityValue.length === 0} onClick={() => alert(`Appliquer`)}>Appliquer</Button>
    )
 
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