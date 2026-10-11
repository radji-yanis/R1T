import { useState, useEffect } from 'react'

import BottomDrawer from "../BottomDrawer/BottomDrawer";
import DetailsMatch from "../../popups/DetailsMatchs/DetailsMatch";
import Button from "../Button/Button";

export default function MatchDrawer(props) {
    const { openedDrawer, setOpenedDrawer, detailedMatchId, setDetailedMatchId } = props;

    const [details, setDetails] = useState([]);

    const stickyFooter = (
        <Button onClick={() => alert(`inscription au match ${detailedMatchId}`)}>Inscription</Button>
    )

    useEffect(() => {
        if(detailedMatchId === null)
            return;

        const url = `http://localhost:3000/api/rencontres/${detailedMatchId}`;
        
        (async () => {
            try {
                const response = await fetch(url)
                const data = await response.json();
                setDetails(data);
                console.log(data);
            } catch (error) {
                console.log(error)
            } finally {
                setOpenedDrawer(true);
                // setDetailedMatchId(null);
            }
        })()
    }, [detailedMatchId]);

    useEffect(() => {
        if(!openedDrawer && detailedMatchId !== null)
            setDetailedMatchId(null);
    }, [openedDrawer]);
 
    return <BottomDrawer open={openedDrawer} setOpen={setOpenedDrawer} stickyFooter={stickyFooter}>
        <DetailsMatch {...details}/>
    </BottomDrawer>
}