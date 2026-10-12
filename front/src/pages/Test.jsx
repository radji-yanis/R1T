import { useState, useEffect } from 'react'

import Header from "../components/Header/Header"
import GeolocationDrawer from "../components/GeolocationDrawer/GeolocationDrawer";

export default function Test() {
    const [latLng, setLatLng] = useState({});
    const [openedGeolocationDrawer, setOpenedGeolocationDrawer] = useState(false);

    return (
        <>
            <Header titre="Test"/>
            <button onClick={() => setOpenedGeolocationDrawer(true)}>OPEN GEOLOCATION</button>
            <GeolocationDrawer openedGeolocationDrawer={openedGeolocationDrawer} setOpenedGeolocationDrawer={setOpenedGeolocationDrawer} latLng={latLng} setLatLng={setLatLng} />
        </>
    );
}