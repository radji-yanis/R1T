const BASE_URL = "http://localhost:3000/api";

export async function getRencontres() {
    const response = await fetch(`${BASE_URL}/rencontres/`);

    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }

    return response.json();
}

export async function getRencontreById(id) {
    const response = await fetch(`${BASE_URL}/rencontres/${id}`);

    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }

    return response.json();
}