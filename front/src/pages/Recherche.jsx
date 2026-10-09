import { useState, useEffect } from 'react'

import Header from "../components/Header/Header"
import Card from "../components/Card/Card"
import Loader from "../components/Loader/Loader"
import SimpleMessage from "../components/SimpleMessage/SimpleMessage"

export default function Recherche() {
    const [rencontres, setRencontres] = useState([]);
    const [chargementRencontres, setChargementRencontres] = useState(true);

    useEffect(() => {
        let url = "http://localhost:3000/api/rencontre/all";

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