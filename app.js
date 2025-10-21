import express from 'express';
import dotenv from 'dotenv';
import router from './route.js';

const app = express();

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
