import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import BottomDrawer from "../components/BottomDrawer/BottomDrawer";
import "./MesMatchs.css";

export default function MesMatchs() {
  const [openedDrawer, setOpenedDrawer] = useState(false);

  const switchDrawer = () => {
    setOpenedDrawer((prev) => !prev);
  };

  return (
    <>
      <Header titre="Mes matchs" />
      <Button onClick={switchDrawer}>Ouvrir Slide</Button>

      <BottomDrawer open={openedDrawer} setOpen={setOpenedDrawer}>
        <h2 className="drawer-title">NOUVEAU MATCH</h2>
        <form
          className="match-form"
          onSubmit={(e) => {
            e.preventDefault();
            setOpenedDrawer(false);
          }}
        >
          <div className="form-group">
            <label>Titre</label>
            <input type="text" placeholder="" required />
          </div>

          <div className="form-group">
            <label>Lieu</label>
            <input type="text" placeholder="" required />
          </div>

          <div className="form-group">
            <label>Format</label>
            <div className="select-wrapper">
              <select defaultValue="5 contre 5">
                <option value="5 contre 5">5 contre 5</option>
                <option value="7 contre 7">7 contre 7</option>
                <option value="11 contre 11">11 contre 11</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="text" placeholder="jj/mm/aaaa" required />
            </div>
            <div className="form-group">
              <label>Heure</label>
              <input type="text" placeholder="-- : --" required />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="" rows={4} />
          </div>

          <Button type="submit" className="btn-submit">
            CRÉER LE MATCH
          </Button>

          <Button
            type="button"
            className="btn-cancel"
            onClick={() => setOpenedDrawer(false)}
          >
            fermer le bordel
          </Button>
        </form>
      </BottomDrawer>
    </>
  );
}
