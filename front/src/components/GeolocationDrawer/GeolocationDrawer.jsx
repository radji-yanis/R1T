import { useState, useEffect } from 'react'

import BottomDrawer from "../BottomDrawer/BottomDrawer";
import Geolocation from "../../popups/Geolocation/Geolocation";
import Button from "../Button/Button";

export default function GeolocationDrawer(props) {
    const { cityValue, setCityValue, radiusValue, setRadiusValue, openedGeolocationDrawer, setOpenedGeolocationDrawer } = props;

    const stickyFooter = (
        <Button  disabled={cityValue.length === 0} onClick={() => alert(`Appliquer`)}>Appliquer</Button>
    )
 
    return <BottomDrawer open={openedGeolocationDrawer} setOpen={setOpenedGeolocationDrawer} stickyFooter={stickyFooter}>
        <Geolocation cityValue={cityValue} setCityValue={setCityValue} setRadiusValue={setRadiusValue}  radiusValue={radiusValue}/>
    </BottomDrawer>
}