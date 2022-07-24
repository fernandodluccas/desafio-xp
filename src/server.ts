import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import swaggerFile from '../swagger.json';
import errorHandler from './errors/error.handler';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorHandler);

export default app;

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
