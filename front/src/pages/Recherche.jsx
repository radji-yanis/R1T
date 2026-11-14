import { useState, useEffect, useTransition } from 'react'
import { useLocation } from "react-router";

import { useToast } from "../components/ToastNotification/ToastNotification";

import Header from "../components/Header/Header"
import Card from "../components/Card/Card"
import Loader from "../components/Loader/Loader"
import SimpleMessage from "../components/SimpleMessage/SimpleMessage"
import MatchDrawer from "../components/MatchDrawer/MatchDrawer"
import Filters from '../components/Filters/Filters';

import { getRencontres } from '../api/rencontres'
import { useAuth } from '../context/AuthContext';

export default function Recherche() {
    const [rencontres, setRencontres] = useState([]);
    const [chargementRencontres, setChargementRencontres] = useState(true);
    const [detailedMatchId, setDetailedMatchId] = useState(null);
    const [openedMatchDrawer, setOpenedMatchDrawer] = useState(false);
    const [filters, setFilters] = useState({});
    
    const toast = useToast();
    const location = useLocation();
    const connected = location.state?.connected ?? false;

    const { user } = useAuth();

    useEffect(() => {
        if(connected) {
            toast.success({
                title: "Connexion réussie",
                message: `Bienvenue à toi, ${user.pseudo} ! 🫡`, 
            })
        }
    }, []);

    useEffect(() => {
        if(Object.keys(filters).length === 0) return;

        setChargementRencontres(true);

        (async () => {
            try {
                const data = await getRencontres(filters);
                setRencontres(data);
            } catch (error) {
                toast.error("Impossible de charger les matchs.");
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
                ? <SimpleMessage content="Aucune rencontre trouvée."/>
                : <section className='cards'>
                    { rencontres.map(rencontre => <Card key={rencontre.id} openedDrawer={openedMatchDrawer} detailedMatchId={detailedMatchId} setDetailedMatchId={setDetailedMatchId} {...rencontre}/>) }
                </section>
            }
        </>
    );
}