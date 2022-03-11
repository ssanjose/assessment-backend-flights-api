import { createDate, moveFlightToNewDate } from "../services/date.service";
import { createFlight } from "../services/flight.service";
import { uploadTicket } from "../services/ticket.service";
import { validateDate } from "../validations/date.validation";
import { validateFlight } from "../validations/flight.validation";
import { validateTicket } from "../validations/ticket.validation";

export const ticketPost = (req) => {
    try {
        // validate date
        if (!validateDate(req.body["event"]["flightDate"]))
            return "Invalid flight date";

        // validate flight
        let flightCode = validateFlight(req.app.locals.flights, req.body["event"]);

        // validate ticket
        let ticketMessage = validateTicket(req.app.locals.flights, req.app.locals.tickets, req.body["event"]);

        // upload ticket or return error
        if (ticketMessage === "") {
            // create date if it doesn't exist
            let date = createDate(req.app.locals.dates, req.body["event"]);
            let flight;

            // update flight
            if (flightCode === 0)
                flight = createFlight(date, req.app.locals.flights, req.body["event"]);
            else if (flightCode === 1)
                flight = moveFlightToNewDate(req.app.locals.flights, req.app.locals.dates, date, req.body["event"]);

            uploadTicket(req.app.locals.flights, req.app.locals.tickets, flight || flightCode, req.body["event"]);
            return "";
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