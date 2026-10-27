const BASE_URL = "http://localhost:3000/api";

export async function getUserById(id) {
    const response = await fetch(`${BASE_URL}/utilisateur/${id}`);

    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }

    return response.json();
}