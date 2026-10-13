import { Slider } from '@base-ui/react/slider';

import styles from "./GeolocationSlider.module.css"

export default function GeolocationSlider() {
    return (
        <Slider.Root 
            defaultValue={30}
            min={0}
            max={100}
            step={10}
        >
            <Slider.Value className={styles.Value} />
            <Slider.Control className={styles.Control}>
                <Slider.Track className={styles.Track}>
                    <Slider.Indicator className={styles.Indicator} />
                    <Slider.Thumb aria-label="Volume" className={styles.Thumb} />
                </Slider.Track>
            </Slider.Control>
        </Slider.Root>
    );
}