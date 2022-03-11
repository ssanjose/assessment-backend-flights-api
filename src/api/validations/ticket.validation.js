import { checkSeatInFlight } from "../helpers/getSeatInFlight";

// validates ticket data
export const validateTicket = (flights, tickets, event) => {
    // check if ticketId, flightNumber, seatNumber, ticketCost exist
    // check if ticketCost is numeric
    if (!event["ticketId"])
        return "ticketId is required";
    if (!event["flightNumber"])
        return "flightNumber is required";
    if (!event["seatNumber"])
        return "seatNumber is required";
    if (!event["ticketCost"])
        return "ticketCost is required";
    if (isNaN(event["ticketCost"]))
        return "ticketCost is not a number";

    // check if ticketId is already exists
    // if it does, return it already exists
    if (tickets.has(event["ticketId"]))
        return "ticketId already exists";

    // check if seatNumber is alphanumeric
    if (!isAlphaNumeric(event["seatNumber"]))
        return "seatNumber is not alpha numeric";

    // check if seatNumber is unique per flight
    // if it is not, return it already exists
    if (checkSeatInFlight(flights, tickets, event["flightNumber"], event["seatNumber"]))
        return "seatNumber already taken";

    return "";
};

const isAlphaNumeric = (str) => {
    return /^[a-z0-9]+$/i.test(str);
}