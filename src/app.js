import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { routes } from './api/routes/routes';

export const app = express();

//  ----------------------------------------------------------------
//  ----------------    MIDDLEWARE
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//  ----------------------------------------------------------------
//  ----------------   ROUTES
app.use('/api', routes);

//  ----------------------------------------------------------------
//  ----------------   ERROR HANDLING REQUESTS
app.use((req, res, next) => {
    const error = new Error("Not found");
    next(error);
}, (error, req, res, next) => {
    res.status(404).json({
        error: {
            message: error.message,
        },
    });
});
