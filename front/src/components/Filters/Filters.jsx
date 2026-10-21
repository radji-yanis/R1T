import { useState, useEffect } from "react";

import CustomSelect from "../CustomSelect/CustomSelect";

import GeolocationDrawer from "../GeolocationDrawer/GeolocationDrawer";

import styles from "./Filters.module.css";

export default function Filters({ setFilters }) {
  const [period, setPeriod] = useState("");
  const [format, setFormat] = useState("");
  const [locationValue, setLocationValue] = useState([]);
  const [openedGeolocationDrawer, setOpenedGeolocationDrawer] = useState(false);

  function handlePeriodChange(value) {
    setPeriod(value);
  }

  function handleFormatChange(value) {
    setFormat(value);
  }

  useEffect(() => {
    // setFilters()
    console.log(period, format, locationValue);
  }, [period, format, locationValue])

  return (
    <>
      <div className={styles.geolocation}>
        <input type="text" 
          value={
            locationValue?.[0]?.[0]
              ? `${locationValue[0][0]}`
              : ""
          }
          placeholder="Saisir une localisation..."
          onClick={() => setOpenedGeolocationDrawer(true)}
          readOnly
        />
        { locationValue?.[0]?.[0] &&
          <div className={styles.radius}>
            {`${locationValue[1]}km`}
          </div>
        }
      </div>
      <div className={styles.selects}>
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
        ]} onChange={handleFormatChange}/>
      </div>
      <GeolocationDrawer 
          setLocationValue={setLocationValue}
          openedDrawer={openedGeolocationDrawer} 
          setOpenedDrawer={setOpenedGeolocationDrawer} 
      />
    </>
  );
}