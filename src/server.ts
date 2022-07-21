import express from 'express';
import 'express-async-errors';
import routes from './routes';
import errorHandler from './errors/error.handler';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
