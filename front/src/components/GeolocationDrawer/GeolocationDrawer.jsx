import { useState, useEffect } from 'react'

import BottomDrawer from "../BottomDrawer/BottomDrawer";
import Geolocation from "../../popups/Geolocation/Geolocation";
import Button from "../Button/Button";

export default function GeolocationDrawer(props) {
    const { latLng, setLatLng, openedGeolocationDrawer, setOpenedGeolocationDrawer } = props;

    const stickyFooter = (
        <Button onClick={() => alert(`Appliquer`)}>Appliquer</Button>
    )
 
    return <BottomDrawer open={openedGeolocationDrawer} setOpen={setOpenedGeolocationDrawer} stickyFooter={stickyFooter}>
        <Geolocation/>
    </BottomDrawer>
}