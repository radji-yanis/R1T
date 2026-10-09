import { useState, useEffect } from 'react'

import Header from "../components/Header/Header"
import Card from "../components/Card/Card"
import Loader from "../components/Loader/Loader"
import SimpleMessage from "../components/SimpleMessage/SimpleMessage"
import MatchDrawer from "../components/MatchDrawer/MatchDrawer"

export default function Recherche() {
    const [rencontres, setRencontres] = useState([]);
    const [chargementRencontres, setChargementRencontres] = useState(true);
    const [detailedMatchId, setDetailedMatchId] = useState(null);

    useEffect(() => {
        const url = "http://localhost:3000/api/rencontres/";

        (async () => {
            try {
                const response = await fetch(url)
                const data = await response.json();
                setRencontres(data);
            } catch (error) {
                console.log(error)
            } finally {
                setChargementRencontres(false)
            }
        })()
    }, []);

    // useEffect(() => {
    //     if(openedDrawer === true)
    //         return;

    //     setDetailedMatchId(null);
    // }, [openedDrawer]);

    // useEffect(() => {
    //     if(detailedMatchId === null)
    //         return;

        
    //     console.log("useEffect recherche"); 

    // //     let url = `http://localhost:3000/api/rencontres/${detailedMatchId}`;

    // //     (async () => {
    // //         try {
    // //             const response = await fetch(url)
    // //             const data = await response.json();
    // //             console.log(data); 
    // //             // setRencontres(data);
    // //         } catch (error) {
    // //             console.log(error)
    // //         } finally {
    // //             setOpenedDrawer(true);
    // //             // setChargementRencontres(false)
    // //         }
    // //     })()
    // }, [detailedMatchId]);

    return (
        <>
            <Header titre="Recherche"/>
            <MatchDrawer detailedMatchId={detailedMatchId} setDetailedMatchId={setDetailedMatchId}/>
            {/* <BottomDrawer open={openedDrawer} setOpen={setOpenedDrawer}>
                <h2>salut</h2>
            </BottomDrawer> */}
            {chargementRencontres
                ? <Loader/>
                : rencontres.length === 0
                ? <SimpleMessage content="Aucune rencontre, sorry bro."/>
                : <section className='cards'>
                    { rencontres.map(rencontre => <Card key={rencontre.id} setDetailedMatchId={setDetailedMatchId} {...rencontre}/>) }
                </section>
            }
        </>
    );
}