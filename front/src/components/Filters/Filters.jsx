import { useState } from "react";
import styles from "./Filters.module.css";

export default function Filters({ onFilter }) {
  const [period, setPeriod] = useState("semaine");
  const [format, setFormat] = useState("");

  function handlePeriodChange(e) {
    const value = e.target.value;
    setPeriod(value);
    onFilter?.({ periode: value, format });
  }

  function handleFormatChange(e) {
    const value = e.target.value;
    setFormat(value);
    onFilter?.({ periode: period, format: value });
  }

  return (
    <div className={styles.filter}>
      <select value={period} onChange={handlePeriodChange}>
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
