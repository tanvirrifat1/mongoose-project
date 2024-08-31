import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoute } from './app/modules/user/user.route';
import GlobalErrorHandler from './app/middlewares/GlobalErrorHandler';
import NotFound from './app/middlewares/NotFound';

const app: Application = express();

// parser
app.use(express.json());
app.use(express.text());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoute);

// Global Error Handler
app.use(GlobalErrorHandler);
app.use(NotFound);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
