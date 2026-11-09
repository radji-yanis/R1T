import { useEffect, useState } from "react";
import { getOrganizedMatches, getRegisteredMatches } from "../api/rencontres";
import { useToast } from "../components/ToastNotification/ToastNotification"

import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import CreateDrawer from "../components/CreateDrawer/CreateDrawer";
import MatchDrawer from "../components/MatchDrawer/MatchDrawer"
import Button from "../components/Button/Button";
import Loader from "../components/Loader/Loader"
import SimpleMessage from "../components/SimpleMessage/SimpleMessage";

export default function MesMatchs() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const [detailedMatchId, setDetailedMatchId] = useState(null);
  const [openedMatchDrawer, setOpenedMatchDrawer] = useState(false);
  const [organizedMatches, setOrganizedMatches] = useState([]);
  const [registeredMatches, setRegisteredMatches] = useState([]);
  const [chargementRencontres, setChargementRencontres] = useState(true);
  
  const toast = useToast();

  useEffect(() => {
    async function loadMatches() {
      try {
        const [organized, registered] = await Promise.all([
          getOrganizedMatches(1),
          getRegisteredMatches(1),
        ]);

        setOrganizedMatches(organized);
        setRegisteredMatches(registered);
      } catch (err) {
        toast.error("Impossible de charger les matchs.");
      } finally {
        setChargementRencontres(false);
      }
    }

    loadMatches();
  }, []);

  return (
    <>
      <Header titre="Mes matchs" />
      <section className="section">
        <h2 className="h2-min">J'ORGANISE</h2>
        {chargementRencontres 
          ? <Loader/>
          : <>
            {organizedMatches.length === 0 ? (
              <SimpleMessage content="Aucun match organisé."/>
            ) : (
              organizedMatches.map((match) => (
                <Card key={match.id} openedDrawer={openedMatchDrawer} detailedMatchId={detailedMatchId} setDetailedMatchId={setDetailedMatchId} {...match}/>
              ))
            )}
            <Button onClick={() => setOpenedDrawer(true)} isSecondary>NOUVEAU MATCH</Button>
          </>
        }
      </section>
      <section>
        <h2 className="h2-min">JE JOUE</h2>
        {chargementRencontres 
          ? <Loader/>
          : <>
            {registeredMatches.length === 0 ? (
              <SimpleMessage content="Aucun match rejoint."/>
            ) : (
              registeredMatches.map((match) => (
                <Card key={match.id} openedDrawer={openedMatchDrawer} detailedMatchId={detailedMatchId} setDetailedMatchId={setDetailedMatchId} {...match}/>
              ))
            )}
          </>
        }
      </section>
      <CreateDrawer
        setOpenedDrawer={setOpenedDrawer}
        openedDrawer={openedDrawer}
      />
      <MatchDrawer openedDrawer={openedMatchDrawer} setOpenedDrawer={setOpenedMatchDrawer} detailedMatchId={detailedMatchId} setDetailedMatchId={setDetailedMatchId}/>
    </>
  );
}
