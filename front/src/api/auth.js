async function call(path, options = {}) {
  const res = await fetch(`/api/auth${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(donnees.message ?? "Erreur inattendue");
    error.status = res.status;
    error.details = data.details ?? {};
    throw error;
  }
  return data;
}

export const register = (data) => {
  call("/registration", { method: "POST", body: JSON.stringify(data) });
};
export const connect = (identifiers) => {
  call("/connection", { method: "POST", body: JSON.stringify(identifiers) });
};
export const disconnect = () => {
  call("/disconnect", { method: "POST" });
};
export const getMe = () => {
  call("/me", { method: "GET" });
};
