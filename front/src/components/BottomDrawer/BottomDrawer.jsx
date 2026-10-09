import { Drawer } from '@base-ui/react/drawer';
import styles from './BottomDrawer.module.css';

export default function BottomDrawer(props) {
  const {children, open, setOpen} = props;

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      {/* <Drawer.Trigger className={styles.Button}>Open bottom drawer</Drawer.Trigger> */}
      <Drawer.Portal>
        <Drawer.Backdrop className={styles.Backdrop} />
        <Drawer.Viewport className={styles.Viewport}>
          <Drawer.Popup className={styles.Popup}>
            <div className={styles.Handle} />
            <Drawer.Content className={styles.Content}>
              {children}
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}