import { useEffect, useState } from "react";
import { getOrganizedMatches, getRegisteredMatches } from "../api/rencontres";
import { useToast } from "../components/ToastNotification/ToastNotification"
import { useAuth } from "../context/AuthContext";

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
  const [chargementRencontresOrganisees, setChargementRencontresOrganisees] = useState(true);
  const [matchCreated, setMatchCreated] = useState(false);
  
  const toast = useToast();
  const { user } = useAuth();

  useEffect(() => {
    async function loadMatches() {
      try {
        const [organized, registered] = await Promise.all([
          getOrganizedMatches(user.id),
          getRegisteredMatches(user.id),
        ]);

        setOrganizedMatches(organized);
        setRegisteredMatches(registered);
      } catch (err) {
        toast.error("Impossible de charger les matchs.");
      } finally {
        setChargementRencontres(false);
        setChargementRencontresOrganisees(false);
      }
    }

    loadMatches();
  }, []);

  useEffect(() => {
    if(matchCreated) {
      setChargementRencontresOrganisees(true);
      
      async function loadOrganizedMatches() {
        try {
          const organized = await getOrganizedMatches(user.id);
          setOrganizedMatches(organized);
        } catch (err) {
          toast.error("Impossible de charger les matchs.");
        } finally {
          setChargementRencontresOrganisees(false);
          setMatchCreated(false);
        }
      }
      loadOrganizedMatches();
    }
  }, [matchCreated]);

  return (
    <>
      <Header titre="Mes matchs" />
      <section className="section">
        <h2 className="h2-min">J'ORGANISE</h2>
        {chargementRencontresOrganisees 
          ? <Loader/>
          : <>
            {organizedMatches.length === 0 ? (
              <SimpleMessage content="Aucun match organisé"/>
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
              <SimpleMessage content="Aucun match rejoint"/>
            ) : (
              registeredMatches.map((match) => (
                <Card key={match.id} openedDrawer={openedMatchDrawer} detailedMatchId={detailedMatchId} setDetailedMatchId={setDetailedMatchId} {...match}/>
              ))
            )}
          </>
        }
      </section>
      <CreateDrawer
        openedDrawer={openedDrawer}
        setOpenedDrawer={setOpenedDrawer}
        matchCreated={matchCreated}
        setMatchCreated={setMatchCreated}
      />
      <MatchDrawer openedDrawer={openedMatchDrawer} setOpenedDrawer={setOpenedMatchDrawer} detailedMatchId={detailedMatchId} setDetailedMatchId={setDetailedMatchId}/>
    </>
  );
}
