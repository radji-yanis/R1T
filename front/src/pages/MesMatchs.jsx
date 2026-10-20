import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import BottomDrawer from "../components/BottomDrawer/BottomDrawer";

export default function MesMAtchs() {
  const [openedDrawer, setOpenedDrawer] = useState(false);

  const switchDrawer = () => {
    setOpenedDrawer(true);
  };

  return (
    <>
      <Header titre="Mes matchs" />
      <Button onClick={switchDrawer}>Ouvrir Slide</Button>
      <BottomDrawer open={openedDrawer} setOpen={setOpenedDrawer}>
        <h1>Ouais</h1>
        <Button
          onClick={() => {
            setOpenedDrawer(false);
          }}
        >
          fermer le bordel
        </Button>{" "}
      </BottomDrawer>
    </>
  );
}
