import { useState, useEffect } from 'react'

import Header from "../components/Header/Header"
import Card from "../components/Card/Card"

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
                ? 'Chargement...'
                : rencontres.length === 0
                ? 'Aucune rencontre'
                : <section className='cards'>
                    { rencontres.map(rencontre => <Card key={rencontre.id} {...rencontre}/>) }
                </section>
            }
        </>
    );
}