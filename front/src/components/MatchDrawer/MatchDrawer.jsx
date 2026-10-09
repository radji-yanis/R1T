import { useState, useEffect } from 'react'

import BottomDrawer from "../BottomDrawer/BottomDrawer";
import DetailsMatch from "../../popups/DetailsMatchs/DetailsMatch";

export default function MatchDrawer(props) {
    const { detailedMatchId, setDetailedMatchId } = props;

    const [details, setDetails] = useState([]);
    const [open, setOpen] = useState(false);

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
                setOpen(true);
                setDetailedMatchId(null);
            }
        })()
    }, [detailedMatchId]);

    return <BottomDrawer open={open} setOpen={setOpen}>
        <DetailsMatch {...details}/>
    </BottomDrawer>
}