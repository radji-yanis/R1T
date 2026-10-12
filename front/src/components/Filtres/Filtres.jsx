import { useState } from "react";
import styles from "./Filtres.module.css";

export default function Filtres({ onFilter }) {
  const [periode, setPeriode] = useState("semaine");
  const [format, setFormat] = useState("");

  function handlePeriodeChange(e) {
    const valeur = e.target.value;
    setPeriode(valeur);
    onFilter?.({ periode: valeur, format });
  }

  function handleFormatChange(e) {
    const valeur = e.target.value;
    setFormat(valeur);
    onFilter?.({ periode, format: valeur });
  }

  return (
    <div className={styles.filtres}>
      <select value={periode} onChange={handlePeriodeChange}>
        <option value="">Toutes les dates</option>
        <option value="jour">Aujourd'hui</option>
        <option value="semaine">Cette semaine</option>
        <option value="mois">Ce mois</option>
      </select>

      <select value={format} onChange={handleFormatChange}>
        <option value="">Type de match</option>
        <option value="foot5">Foot à 5</option>
        <option value="foot7">Foot à 7</option>
        <option value="foot11">Foot à 11</option>
      </select>
    </div>
  );
}
