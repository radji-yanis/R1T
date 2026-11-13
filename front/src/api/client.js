const BASE_URL = "http://localhost:3000/api";

export async function call(path, options = {}) {
   const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
        credentials: "include",
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
        const error = new Error(body.message ?? "Erreur inattendue");
        error.status = res.status;
        error.errors = body.errors ?? {};
        throw error;
    }
  
    return body;
}