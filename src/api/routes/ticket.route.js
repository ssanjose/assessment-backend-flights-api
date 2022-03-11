import express from 'express';
import { ticketPost } from '../controllers/ticket.controller';
export const ticket = express.Router();

// Ticket routes
// req.app.locals.tickets is a Map
ticket.post('/', (req, res) => {
    try {
        let ticketMessage = ticketPost(req);

        if (ticketMessage === "") {
            res.status(200).json({
                status: "success",
            });
        }
        else {
            res.status(400).json({
                status: "failed",
                reason: ticketMessage
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: "failed",
            reason: "Internal server error"
        });
    }
});