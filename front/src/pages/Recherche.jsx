import { useState, useEffect, useTransition } from 'react'

import Header from "../components/Header/Header"
import Card from "../components/Card/Card"
import Loader from "../components/Loader/Loader"
import SimpleMessage from "../components/SimpleMessage/SimpleMessage"
import MatchDrawer from "../components/MatchDrawer/MatchDrawer"
import Filters from '../components/Filters/Filters';

import { getRencontres } from '../api/rencontres'

export default function Recherche() {
    const [rencontres, setRencontres] = useState([]);
    const [chargementRencontres, setChargementRencontres] = useState(true);
    const [detailedMatchId, setDetailedMatchId] = useState(null);
    const [openedMatchDrawer, setOpenedMatchDrawer] = useState(false);
    const [filters, setFilters] = useState({});

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const data = await getRencontres();
    //             setRencontres(data);
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setChargementRencontres(false);
    //         }
    //     })();
    // }, []);

    useEffect(() => {
        if(Object.keys(filters).length === 0) return;

        setChargementRencontres(true);

        (async () => {
            try {
                const data = await getRencontres(filters);
                setRencontres(data);
            } catch (error) {
                console.log(error);
            } finally {
                setChargementRencontres(false);
            }
        })();
    }, [filters])

    return (
        <>
            <Header titre="Recherche"/>
            <Filters setFilters={setFilters}/>
            <MatchDrawer openedDrawer={openedMatchDrawer} setOpenedDrawer={setOpenedMatchDrawer} detailedMatchId={detailedMatchId} setDetailedMatchId={setDetailedMatchId}/>
            {rencontres.length !== 0 &&
                <div style={{marginBottom: '0.5em'}}>{rencontres.length} {rencontres.length > 1 ? "rencontres trouvées" : "rencontre trouvée"}</div>
            }
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