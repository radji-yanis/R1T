import { useState, useEffect } from 'react'

import Header from "../components/Header/Header"
import Card from "../components/Card/Card"
import Loader from "../components/Loader/Loader"
import SimpleMessage from "../components/SimpleMessage/SimpleMessage"
import BottomDrawer from "../components/BottomDrawer/BottomDrawer"

export default function Recherche() {
    const [rencontres, setRencontres] = useState([]);
    const [chargementRencontres, setChargementRencontres] = useState(true);
    // const [detailedMatchId, setDetailedMatchId] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let url = "http://localhost:3000/api/rencontres/";

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

    // }, [detailedMatchId]);

    return (
        <>
            <Header titre="Recherche"/>
            <button onClick={() => setOpen(true)}>click</button>
            <BottomDrawer open={open} setOpen={setOpen}>
                <h2>salut</h2>
            </BottomDrawer>
            {chargementRencontres
                ? <Loader/>
                : rencontres.length === 0
                ? <SimpleMessage content="Aucune rencontre, sorry bro."/>
                : <section className='cards'>
                    { rencontres.map(rencontre => <Card key={rencontre.id} {...rencontre}/>) }
                </section>
            }
        </>
    );
}