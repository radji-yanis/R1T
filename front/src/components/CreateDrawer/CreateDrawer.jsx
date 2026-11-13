import { useRef, useState } from 'react';

import BottomDrawer from "../BottomDrawer/BottomDrawer";
import Button from "../Button/Button";
import CustomSelect from "../CustomSelect/CustomSelect";
import AutocompleteAdress from "../../components/AutocompleteAdress/AutocompleteAdress";

import { createRencontre } from "../../api/rencontres";
import { useToast } from "../ToastNotification/ToastNotification";

import formStyles from "../../form.module.css";
import { useAuth } from '../../context/AuthContext';
import Field from '../Field/Field';
import { useEffect } from 'react';

export default function CreateDrawer(props) {
  const { openedDrawer, setOpenedDrawer, setMatchCreated } = props;
  const [ errors, setErrors ] = useState({});
  const [ submitting, setSubmitting ] = useState(false);

  const [cityValue, setCityValue] = useState([]);
  const formRef = useRef(null);
  const toast = useToast();
  const { user } = useAuth();

  const stickyFooter = (
    <Button onClick={() => formRef.current && formRef.current.requestSubmit()} disabled={submitting}>
      CRÉER LE MATCH
    </Button>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.lieu = cityValue[0];
    data.longitude = Number(cityValue[1]);
    data.latitude = Number(cityValue[2]);
    data.organisateur_id = user.id;

    try {
      await createRencontre(data);
      toast.success({
          title: "Création réussie",
          message: "Rendez-vous sur le r1t ! 🔥", 
        })
      setErrors({});
      setCityValue([]);
      setMatchCreated(true);
      setOpenedDrawer(false);
    } catch (error) {
      if ([400, 422].includes(error.status)) {
        setErrors(error.errors);
        toast.error({
          title: "Création échouée",
          message: "Le formulaire contient des erreurs. 😣", 
        })
      }
    } finally {
      setSubmitting(false);
    }
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
          noValidate       
        >
          <Field id="titre" label="Titre" type="text" error={errors.titre} placeholder="Match en détente" required/>
          <Field id="lieu" label="Adresse" error={errors.lieu}>
            <AutocompleteAdress name="lieu" required={true} cityValue={cityValue} setCityValue={setCityValue} />
          </Field>
          <Field id="format" label="Format" error={errors.format}>
            <CustomSelect name="format" isClassic options={[
              { label: '5 contre 5', value: 'foot5' },
              { label: '7 contre 7', value: 'foot7' },
              { label: '11 contre 11', value: 'foot11' },
            ]}/>
          </Field>
          <div className={formStyles.row}>
            <Field id="date" label="Date" type="date" error={errors.date} placeholder="jj/mm/aaaa" min={new Date().toISOString().split('T')[0]} required />
            <Field id="time" label="Heure" type="time" error={errors.time} placeholder="-- : --" required />
          </div>
          <Field id="description" label="Description" error={errors.format}>
            <textarea name="description" placeholder="Détails sur le match..." rows={3} />
          </Field>
        </form>
      </BottomDrawer>
    </>
  );
}
