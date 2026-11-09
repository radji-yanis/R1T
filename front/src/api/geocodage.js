const BASE_URL = "https://data.geopf.fr/geocodage/search/";

export async function getCities(value, signal) {
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(value)}&limit=5&type=municipality`, {
        signal: signal
    });

    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }

    return response.json();
}