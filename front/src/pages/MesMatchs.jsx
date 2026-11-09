import { useEffect, useState } from "react";
import { getOrganizedMatches, getRegisteredMatches } from "../api/rencontres";
import Header from "../components/Header/Header";
import CreateDrawer from "../components/CreateDrawer/CreateDrawer";
import Button from "../components/Button/Button";
import "./MesMatchs.css";

export default function MesMatchs() {
  const [openedDrawer, setOpenedDrawer] = useState(false);

  const [organizedMatches, setOrganizedMatches] = useState([]);
  const [registeredMatches, setRegisteredMatches] = useState([]);
  const [error, setError] = useState("");

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
        setError("Unable to load matches.");
        console.error(err);
      }
    }

    loadMatches();
  }, []);

  const switchDrawer = () => {
    setOpenedDrawer((prev) => !prev);
  };

  return (
    <>
      <Header titre="Mes matchs" />

      {error && <p className="matches-error">{error}</p>}

      <section className="matches-section">
        <h2>J'ORGANISE</h2>

        {organizedMatches.length === 0 ? (
          <p>Aucun match organisé.</p>
        ) : (
          organizedMatches.map((match) => (
            <article className="match-card" key={match.id}>
              <h3>{match.titre}</h3>
              <p>{match.lieu}</p>
              <p>{new Date(match.date_heure).toLocaleString("fr-FR")}</p>
            </article>
          ))
        )}
      </section>

      <div className="new-match-action">
        <Button onClick={switchDrawer}>NOUVEAU MATCH</Button>
      </div>

      <section className="matches-section">
        <h2>JE JOUE</h2>

        {registeredMatches.length === 0 ? (
          <p>Aucun match rejoint.</p>
        ) : (
          registeredMatches.map((match) => (
            <article className="match-card" key={match.id}>
              <h3>{match.titre}</h3>
              <p>{match.lieu}</p>
              <p>{new Date(match.date_heure).toLocaleString("fr-FR")}</p>
            </article>
          ))
        )}
      </section>

      <CreateDrawer
        setOpenedDrawer={setOpenedDrawer}
        openedDrawer={openedDrawer}
      />
    </>
  );
}
