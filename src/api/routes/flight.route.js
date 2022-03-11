import express from 'express';
import { getAllFlights } from '../controllers/flight.controller.js';
export const flight = express.Router();

// Flight routes
flight.get('/', (req, res) => {
    try {
        let flights = getAllFlights(req);
        console.log(flights);
        // check if status is success or failed
        if (flights.statusMessage === "success") {
            res.status(200).json(flights.data);
        }
        else {
            res.status(400).json({
                statusMessage: "failed",
                reason: flights.data
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