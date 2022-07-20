import express from 'express';

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

app.listen(port, () => console.log(`Server running on port ${port}`));
