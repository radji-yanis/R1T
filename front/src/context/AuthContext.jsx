import { createContext, useEffect, useState } from "react";
import * as api from "../api/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const user = api.getMe();
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  async function connection(identifiers) {
    const data = await api.connect(identifiers);
    setUser(data.user);
  }

  async function disconnection() {
    await api.disconnect();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, connection, disconnection }}>
      {children}
    </AuthContext.Provider>
  );
}
