import { useState, useTransition, useRef } from 'react'
import { Autocomplete } from '@base-ui/react/autocomplete';
import debounce from 'debounce';

import styles from "./AutocompleteAdress.module.css"

const API_URL = 'https://data.geopf.fr/geocodage/search/';
const DEBOUNCE = 500;

const executerRecherche = debounce((valeur, startTransition, setSearchResults, abortControllerRef) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    startTransition(async () => {
        try {
            const response = await fetch(`${API_URL}?q=${encodeURIComponent(valeur)}&limit=5&type=municipality`, {
                signal: controller.signal
            });
            const data = await response.json();
            setSearchResults(data.features || []); 
        } catch (err) {
            if (err.name === 'AbortError') {
                console.error(`Requête annulée pour : ${valeur}`);
            } else {
                console.error("Erreur: ", err);
            }
        }
    });
}, DEBOUNCE); 

export default function AutocompleteAdress() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    
    const [isPending, startTransition] = useTransition();

    const abortControllerRef = useRef(null);

    function getStatus() {
        if (isPending) {
            return (
                <>
                    <span className={styles.Spinner} aria-hidden />
                    Recherche…
                </>
            );
        }

        if (searchValue < 3) {
            return null;
        }

        if (searchResults.length === 0) {
            return `Aucun résultat pour "${searchValue}"`;
        }

        return `${searchResults.length} resultat${searchResults.length === 1 ? '' : 's'} trouvé${searchResults.length === 1 ? '' : 's'}`;
    }
    const status = getStatus();

    return (
        <Autocomplete.Root
            items={searchResults}
            value={searchValue}
            onValueChange={(nextValue) => {
                setSearchValue(nextValue); 
                console.log(searchResults.length);

                if (nextValue.length < 3) {
                    executerRecherche.clear(); 
                    abortControllerRef.current?.abort();
                    setSearchResults([]);
                    return;
                }

                executerRecherche(nextValue, startTransition, setSearchResults, abortControllerRef);
            }}
            itemToStringValue={(item) => `${item.properties.city} - ${item.properties.postcode}`}
            filter={null}
        >
            <Autocomplete.Input placeholder="ex: Montreuil - 93100" className={styles.Input} />

            <Autocomplete.Portal hidden={!status}>
                <Autocomplete.Positioner className={styles.Positioner} sideOffset={4} align="start">
                <Autocomplete.Popup className={styles.Popup} aria-busy={isPending || undefined}>
                    <div className={styles.Viewport}>
                    <Autocomplete.Status>
                        {status && <div className={styles.Status}>{status}</div>}
                    </Autocomplete.Status>
                    <Autocomplete.List>
                        {feature => (
                        <Autocomplete.Item key={feature.properties.id} className={styles.Item} value={feature}>
                            <div className={styles.AdressItem}>
                                <span className={styles.AdressCity}>{feature.properties.city} <span className={styles.AdressCode}>- {feature.properties.postcode}</span></span>
                            </div>
                        </Autocomplete.Item>
                        )}
                    </Autocomplete.List>
                    </div>
                </Autocomplete.Popup>
                </Autocomplete.Positioner>
            </Autocomplete.Portal>
        </Autocomplete.Root>
    );
}
