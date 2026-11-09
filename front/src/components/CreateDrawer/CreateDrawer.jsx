import { useRef, useState } from 'react';

import BottomDrawer from "../BottomDrawer/BottomDrawer";
import Button from "../Button/Button";
import CustomSelect from "../CustomSelect/CustomSelect";
import AutocompleteAdress from "../../components/AutocompleteAdress/AutocompleteAdress";

import { createRencontre } from "../../api/rencontres";
import { useToast } from "../ToastNotification/ToastNotification";

// import styles from "./CreateDrawer.module.css";
import formStyles from "../../form.module.css";

export default function CreateDrawer(props) {
  const { openedDrawer, setOpenedDrawer } = props;

  const [cityValue, setCityValue] = useState([]);
  const formRef = useRef(null);
  const toast = useToast();

  const stickyFooter = (
    <Button onClick={() => formRef.current && formRef.current.requestSubmit()} form="matchForm" className="btn-submit">
      CRÉER LE MATCH
    </Button>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    data.date_heure = `${data.date} ${data.time}`;
    data.lieu = cityValue[0];
    data.longitude = Number(cityValue[1]);
    data.latitude = Number(cityValue[2]);
    //temporaire
    data.organisateur_id = 1;

    createRencontre(data);

    toast.success(`Match créé avec succès`);

    setOpenedDrawer(false);
  };

  return (
    <>
      <BottomDrawer
        stickyFooter={stickyFooter}
        open={openedDrawer}
        setOpen={setOpenedDrawer}
      >
        <form
          id="matchForm"
          className={formStyles.form}
          onSubmit={handleSubmit}
          ref={formRef}        
        >
          <label>Titre
            <input name="titre" type="text" placeholder="" required />
          </label>

          <label>Adresse
            <AutocompleteAdress name="lieu" required={true} cityValue={cityValue} setCityValue={setCityValue} />
          </label>

          <label>Format
            <CustomSelect name="format" isClassic options={[
              { label: '5 contre 5', value: 'foot5' },
              { label: '7 contre 7', value: 'foot7' },
              { label: '11 contre 11', value: 'foot11' },
            ]}/>
          </label>

          <div className={formStyles.row}>
            <label>Date
              <input name="date" type="date" placeholder="jj/mm/aaaa" min={new Date().toISOString().split('T')[0]} required />
            </label>
            <label>Heure
              <input name="time" type="time" placeholder="-- : --" required />
            </label>
          </div>

          <label>Description
            <textarea name="description" placeholder="" rows={3} />
          </label>
        </form>
      </BottomDrawer>
    </>
  );
}
