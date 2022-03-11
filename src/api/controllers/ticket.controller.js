import { moveFlightToNewDate } from "../services/date.service";
import { createFlight } from "../services/flight.service";
import { uploadTicket } from "../services/ticket.service";
import { validateDate } from "../validations/date.validation";
import { validateFlight } from "../validations/flight.validation";

export const ticketPost = (req) => {
    try {
        // validate date
        if (!validateDate(req.body["flightDate"]))
            return "Invalid flight date";

        // validate flight
        let flightCode = validateFlight(req.app.locals.flights, req.body["event"]);
        if (flightCode === 0)
            createFlight(req.app.locals.flights, req.body["event"]);
        else if (flightCode === 1)
            moveFlightToNewDate(req.app.locals.flights, req.app.locals.dates, req.body["event"]);

        // validate ticket
        let ticketMessage = validateTicket(req.app.locals.flights, req.app.locals.tickets, req.body["event"]);

        // upload ticket or return error
        if (ticketMessage === "") {
            uploadTicket(req.app.locals.flights, req.app.locals.tickets, req.body["event"]);
            return "Ticket uploaded successfully";
        }
        else {
            return ticketMessage;
        }
    }
    catch (error) {
        console.log(error);
        return error;
    }
}