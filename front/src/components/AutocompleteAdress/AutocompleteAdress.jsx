import { useState, useTransition, useRef, useEffect } from 'react'
import { Autocomplete } from '@base-ui/react/autocomplete';
import debounce from 'debounce';

import { getCities } from '../../api/geocodage';

import styles from "./AutocompleteAdress.module.css"

const DEBOUNCE = 500;

const executerRecherche = debounce((value, startTransition, setSearchResults, abortControllerRef, setIsTyping) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsTyping(false);

    startTransition(async () => {
        try {
            const data = await getCities(value, controller.signal);
            setSearchResults(data.features || []); 
        } catch (err) {
            if (err.name === 'AbortError') {
                console.error(`Requête annulée pour : "${valeur}"`);
            } else {
                console.error(err.message);
            }
        }
    });
}, DEBOUNCE); 

export default function AutocompleteAdress({ cityValue, setCityValue }) {

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [disabledInput, setDisabledInput] = useState(false);
    const [isTyping, setIsTyping] = useState([]);
    
    const [isPending, startTransition] = useTransition();

    const abortControllerRef = useRef(null);

    const getStatus = () => {
        if (searchValue.length < 3) {
            return null;
        }
        if (isPending || isTyping) {
            return <><span className={styles.Spinner} aria-hidden /> Recherche…</>
        }
        if (searchResults.length === 0 && !isTyping) {
            return `Aucun résultat pour "${searchValue}"`;
        }
        if (searchResults.length > 0) {
            return `${searchResults.length} resultat${searchResults.length === 1 ? '' : 's'} trouvé${searchResults.length === 1 ? '' : 's'}`;
        }
    };
    const status = getStatus();

    const onMaskClick = () => {
        setDisabledInput(false)
        setSearchValue('');
        setCityValue([]);
    };

    useEffect(() => {
        if(cityValue.length > 0) {
            setDisabledInput(true);
            setSearchValue(cityValue[0]);
        }
    }, []);

    return (
        <Autocomplete.Root
            items={searchResults}
            value={searchValue}
            onValueChange={(nextValue) => {
                setIsTyping(true);
                setSearchValue(nextValue);

                if (nextValue.length < 3) {
                    executerRecherche.clear(); 
                    abortControllerRef.current?.abort();
                    setSearchResults([]);
                    return;
                }

                executerRecherche(nextValue, startTransition, setSearchResults, abortControllerRef, setIsTyping);
            }}
            itemToStringValue={(item) => {
                setDisabledInput(true);
                setCityValue([
                    `${item.properties.postcode} ${item.properties.city}`,
                    item.geometry.coordinates[0],
                    item.geometry.coordinates[1]
                ]);
                return `${item.properties.postcode} ${item.properties.city}`;
            }}
            filter={null}
            disabled={disabledInput}
        >
            <div className={styles.inputContainer}>
                <Autocomplete.Input placeholder="ex: 93100 Montreuil" className={styles.Input} />
                {disabledInput &&
                    <div className={styles.inputMask} onClick={onMaskClick}></div>
                }
            </div>

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
