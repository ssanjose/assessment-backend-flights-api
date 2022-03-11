import express from 'express';
import { ticket } from './ticket.route.js';
import { flight } from './flight.route.js';

export const routes = express.Router();

// Set up routes
routes.use('/tickets', ticket);
routes.use('/flights', flight);
