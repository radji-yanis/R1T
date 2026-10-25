const BASE_URL = "http://localhost:3000/api";

export async function getRencontres(filters) {
    let params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
            params.append(key, value);
        }
    });

    const response = await fetch(`${BASE_URL}/rencontres/?${params.toString()}`);

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