import styles from "./CreateDrawer.module.css";
import BottomDrawer from "../BottomDrawer/BottomDrawer";
import Button from "../Button/Button";
import { createRencontre } from "../../api/rencontres";
import { useToast } from "../ToastNotification/ToastNotification";

const stickyFooter = (
  <Button type="submit" form="matchForm" className="btn-submit">
    CRÉER LE MATCH
  </Button>
);

export default function CreateDrawer(props) {
  const { openedDrawer, setOpenedDrawer } = props;

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    data.date_heure = `${data.date} ${data.time}`;
    //temporaire
    data.organisateur_id = 1;
    data.latitude = 10;
    data.longitude = 10;

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
        <h2 className={styles.drawerTitle}>NOUVEAU MATCH</h2>
        <form
          id="matchForm"
          className={styles.matchForm}
          onSubmit={handleSubmit}
        >
          <div className={styles.formGroup}>
            <label>Titre</label>
            <input name="titre" type="text" placeholder="" required />
          </div>

          <div className={styles.formGroup}>
            <label>Lieu</label>
            <input name="lieu" type="text" placeholder="" required />
          </div>

          <div className={styles.formGroup}>
            <label>Format</label>
            <div className="select-wrapper">
              <select name="format" defaultValue="5 contre 5">
                <option value="foot5">5 contre 5</option>
                <option value="foot7">7 contre 7</option>
                <option value="foot11">11 contre 11</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Date</label>
              <input
                name="date"
                type="date"
                placeholder="jj/mm/aaaa"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Heure</label>
              <input name="time" type="time" placeholder="-- : --" required />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea name="description" placeholder="" rows={4} />
          </div>
          <button type="submit">Créer le match</button>
        </form>
      </BottomDrawer>
    </>
  );
}
