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
//  ----------------   Locals/Variables to store data
// app.locals to be accessed from all routes
// Map is used for structure/storage for easy lookup for uniqueness, and other validations.

// stores ticket details per seat
app.locals.tickets = new Map();
/* sample data
    req.app.locals.tickets.set(event["ticketId"],
        {
            ticketId: event["ticketId"],
            flightNumber: event["flightNumber"],
            seatNumber: event["seatNumber"],
            ticketCost: event["ticketCost"],
        });
*/

// stores ticket numbers per flight
app.locals.flights = new Map();
/* sample data
    req.app.locals.flights.set(event["flightNumber"],
        {
            flightNumber: event["flightNumber"],
            flightDate: event["flightDate"],
            seats: [
                "ticketId1",
                "ticketId2",
            ],
        });
*/

// stores flights per date
app.locals.dates = new Map();
/* sample data
    app.locals.dates.set("2020-01-01",
        {
            date: "2020-01-01",
            flights: [
                "AA123",
                "AA456",
            ],
        });
*/

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
