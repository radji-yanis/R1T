// On importe les pièces de la bibliothèque pour fabriquer des toasts
import { Toast } from "@base-ui/react/toast";
// On importe le fichier CSS : styles.Toast, styles.Close, etc. sont ses classes
import styles from "./ToastNotification.module.css";

// Ce composant se place autour de toute l'application (dans main.jsx)
// "children" est tout ce qu'il entoure, donc ton application
export default function ToastNotification({ children }) {
  return (
    // Le Provider garde la liste des toasts affichés
    <Toast.Provider>
      {/* Ton application s'affiche normalement */}
      {children}
      {/* Le Portal dessine les toasts tout en haut de la page web,
          pour qu'aucun élément de ta page ne les cache */}
      <Toast.Portal>
        {/* Le Viewport est la zone fixe en bas de l'écran où les toasts apparaissent */}
        <Toast.Viewport className={styles.Viewport}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

// Ce composant dessine un toast pour chaque élément de la liste
function ToastList() {
  // On récupère la liste des toasts actuellement affichés
  const { toasts } = Toast.useToastManager();

  // Pour chaque toast de la liste, on dessine une carte
  return toasts.map((toast) => (
    <Toast.Root
      // La key permet à React de reconnaître chaque toast
      key={toast.id}
      // On donne à la bibliothèque les informations de ce toast
      toast={toast}
      // Deux classes : celle commune à tous les toasts,
      // et celle du type (success ou error) qui donne la couleur de la bordure
      className={`${styles.Toast} ${styles[toast.type]}`}
    >
      {/* L'enveloppe intérieure du toast */}
      <Toast.Content className={styles.Content}>
        <div className={styles.Text}>
          {/* Le titre s'affiche tout seul, avec ce qu'on a donné dans add() */}
          <Toast.Title className={styles.Title} />
          {/* La description aussi : c'est le message */}
          <Toast.Description className={styles.Description} />
        </div>
        {/* Le bouton qui retire ce toast de la liste */}
        <Toast.Close className={styles.Close}>Fermer</Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}

// Ce hook est ce que les pages appellent pour afficher un toast
// Exemple : const toast = useToast(); puis toast.success("Bravo")
export function useToast() {
  // On récupère le gestionnaire, qui sait ajouter des toasts à la liste
  const toastManager = Toast.useToastManager();

  return {
    // toast.success("message") ajoute un toast vert avec le titre "Succès"
    success: (message) =>
      toastManager.add({ title: "Success", description: message, type: "success" }),
    // toast.error("message") ajoute un toast rouge avec le titre "Erreur"
    error: (message) =>
      toastManager.add({ title: "Error", description: message, type: "error" }),
  };
}