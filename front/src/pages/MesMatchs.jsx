import { useState } from "react";
import Header from "../components/Header/Header";
import CreateDrawer from "../components/CreateDrawer/CreateDrawer";
import Button from "../components/Button/Button";

export default function MesMatchs() {
  const [openedDrawer, setOpenedDrawer] = useState(false);

  const switchDrawer = () => {
    setOpenedDrawer((prev) => !prev);
  };

  return ( 
    <>
      <Header titre="Mes matchs" />
      <Button onClick={switchDrawer}>Ouvrir Slide</Button>
      <CreateDrawer setOpenedDrawer={setOpenedDrawer} openedDrawer={openedDrawer} />
    </>
  );
}
