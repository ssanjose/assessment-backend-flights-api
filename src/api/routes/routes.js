import express from 'express';
import { ticket } from './ticket.route';
import { flight } from './flight.route';

export const routes = express.Router();

// Set up routes
routes.use('/tickets', ticket);
routes.use('/flights', flight);
