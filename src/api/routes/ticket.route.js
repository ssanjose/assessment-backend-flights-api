import express from 'express';
export const ticket = express.Router();

// Ticket routes
ticket.post('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Ticket created'
    });
});