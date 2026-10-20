import { useState, useEffect, useTransition } from 'react'

import Header from "../components/Header/Header"
import Card from "../components/Card/Card"
import Loader from "../components/Loader/Loader"
import SimpleMessage from "../components/SimpleMessage/SimpleMessage"
import MatchDrawer from "../components/MatchDrawer/MatchDrawer"

import { getRencontres } from '../api/rencontres'

export default function Recherche() {
    const [rencontres, setRencontres] = useState([]);
    const [chargementRencontres, setChargementRencontres] = useState(true);
    const [detailedMatchId, setDetailedMatchId] = useState(null);
    const [openedDrawer, setOpenedDrawer] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = await getRencontres();
                setRencontres(data);
            } catch (error) {
                console.log(error);
            } finally {
                setChargementRencontres(false);
            }
        })();
    }, []);

    return (
        <>
            <Header titre="Recherche"/>
            
            <MatchDrawer openedDrawer={openedDrawer} setOpenedDrawer={setOpenedDrawer} detailedMatchId={detailedMatchId} setDetailedMatchId={setDetailedMatchId}/>

            {chargementRencontres
                ? <Loader/>
                : rencontres.length === 0
                ? <SimpleMessage content="Aucune rencontre, sorry bro."/>
                : <section className='cards'>
                    { rencontres.map(rencontre => <Card key={rencontre.id} openedDrawer={openedDrawer} detailedMatchId={detailedMatchId} setDetailedMatchId={setDetailedMatchId} {...rencontre}/>) }
                </section>
            }
        </>
    );
}