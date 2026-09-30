import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(process.env.PORT, () =>
  console.log(`Serveur sur http://localhost:${process.env.PORT}`)
);