import { useEffect } from 'react'

import { Slider } from '@base-ui/react/slider';

import styles from "./GeolocationSlider.module.css"

export default function GeolocationSlider(props) {
    const { radiusValue, setRadiusValue } = props;

    return (
        <Slider.Root 
            value={radiusValue}
            min={0}
            max={100}
            step={10}
            onValueChange={(value) => {
                setRadiusValue(value);
            }}
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