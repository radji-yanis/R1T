import { useState } from 'react'

import Header from "../components/Header/Header"
import GeolocationDrawer from "../components/GeolocationDrawer/GeolocationDrawer";

export default function Test() {
    const [locationValue, setLocationValue] = useState([]);
    const [openedGeolocationDrawer, setOpenedGeolocationDrawer] = useState(false);

    return (
        <>
            <Header titre="Test"/>
            <button onClick={() => setOpenedGeolocationDrawer(true)}>OPEN GEOLOCATION</button>
            <div>{locationValue}</div>
            <GeolocationDrawer 
                setLocationValue={setLocationValue}
                openedGeolocationDrawer={openedGeolocationDrawer} 
                setOpenedGeolocationDrawer={setOpenedGeolocationDrawer} 
            />
        </>
    );
}

// TODO : refacto avec des children pour passer uniquement mes states depuis cette page