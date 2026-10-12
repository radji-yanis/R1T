import { useState, useEffect } from 'react'

import BottomDrawer from "../BottomDrawer/BottomDrawer";
import Geolocation from "../../popups/Geolocation/Geolocation";
import Button from "../Button/Button";

export default function MatchDrawer(props) {
    const { openedDrawer, setOpenedDrawer } = props;

    const stickyFooter = (
        <Button onClick={() => alert(`Appliquer`)}>Appliquer</Button>
    )
 
    return <BottomDrawer open={openedDrawer} setOpen={setOpenedDrawer} stickyFooter={stickyFooter}>
        <Geolocation/>
    </BottomDrawer>
}