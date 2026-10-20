import { useState } from "react";

import CustomSelect from "../CustomSelect/CustomSelect";

import styles from "./Filters.module.css";

export default function Filters({ onFilter }) {
  const [period, setPeriod] = useState("semaine");
  const [format, setFormat] = useState("");

  function handlePeriodChange(value) {
    setPeriod(value);
    // onFilter?.({ periode: value, format });
  }

  function handleFormatChange(value) {
    setFormat(value);
    // onFilter?.({ periode: period, format: value });
  }

  return (
    <div className={styles.filter}>
      <CustomSelect options={[
        { label: 'Toutes les dates', value: '' },
        { label: 'Aujourd\'hui', value: 'jour' },
        { label: 'Cette semaine', value: 'semaine' },
        { label: 'Ce mois', value: 'mois' },
      ]} onChange={handlePeriodChange}/>
      <CustomSelect options={[
        { label: 'Tout les types', value: '' },
        { label: 'Foot à 5', value: 'foot5' },
        { label: 'Foot à 7', value: 'foot7' },
        { label: 'Foot à 11', value: 'foot11' },
      ]}/>
    </div>
  );
}