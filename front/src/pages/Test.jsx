import { useState, useEffect } from 'react'

import Header from "../components/Header/Header"
import GeolocationDrawer from "../components/GeolocationDrawer/GeolocationDrawer";

const DEFAULT_RADIUS = 20;

export default function Test() {
    const [cityValue, setCityValue] = useState([]);
    const [radiusValue, setRadiusValue] = useState(DEFAULT_RADIUS);
    const [openedGeolocationDrawer, setOpenedGeolocationDrawer] = useState(false);

    return (
        <>
            <Header titre="Test"/>
            <button onClick={() => setOpenedGeolocationDrawer(true)}>OPEN GEOLOCATION</button>
            <div>{cityValue} / {radiusValue}</div>
            <GeolocationDrawer cityValue={cityValue} setCityValue={setCityValue} radiusValue={radiusValue} setRadiusValue={setRadiusValue} openedGeolocationDrawer={openedGeolocationDrawer} setOpenedGeolocationDrawer={setOpenedGeolocationDrawer} />
        </>
    );
}