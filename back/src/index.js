import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import rencontreRoutes from './routes/rencontre.js';
// import utilisateurRoutes from './routes/utilisateur.js';
// import inscriptionRoutes from './routes/inscription.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/rencontres', rencontreRoutes);
// app.use('/api/utilisateur', utilisateurRoutes);
// app.use('/api/inscription', inscriptionRoutes);

app.use((req, res) => res.status(404).json({ erreur: "Route inconnue" }));
app.use((err, req, res, next) => {
  console.error("[erreur]", err.message);
  res.status(500).json({ erreur: err.message });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});