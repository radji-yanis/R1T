import { useState, useEffect } from 'react'

import Header from "../components/Header/Header"
import Card from "../components/Card/Card"
import Loader from "../components/Loader/Loader"
import SimpleMessage from "../components/SimpleMessage/SimpleMessage"
import MatchDrawer from "../components/MatchDrawer/MatchDrawer"
import Filters from '../components/Filters/Filters';

export default function Recherche() {
    const [rencontres, setRencontres] = useState([]);
    const [chargementRencontres, setChargementRencontres] = useState(true);
    const [detailedMatchId, setDetailedMatchId] = useState(null);
    const [openedMatchDrawer, setOpenedMatchDrawer] = useState(false);

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

    return (
        <>
            <Header titre="Recherche"/>
            <Filters/>
            <MatchDrawer openedDrawer={openedMatchDrawer} setOpenedDrawer={setOpenedMatchDrawer} detailedMatchId={detailedMatchId} setDetailedMatchId={setDetailedMatchId}/>
            {chargementRencontres
                ? <Loader/>
                : rencontres.length === 0
                ? <SimpleMessage content="Aucune rencontre, sorry bro."/>
                : <section className='cards'>
                    { rencontres.map(rencontre => <Card key={rencontre.id} openedDrawer={openedMatchDrawer} detailedMatchId={detailedMatchId} setDetailedMatchId={setDetailedMatchId} {...rencontre}/>) }
                </section>
            }
        </>
    );
}