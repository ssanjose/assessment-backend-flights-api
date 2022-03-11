
// Uploads ticket to the app.locals.tickets Map
export const uploadTicket = (flights, tickets, flight, event) => {
    // upload ticket to tickets Map
    tickets.set(event["ticketId"],
        {
            ticketId: event["ticketId"],
            flightNumber: event["flightNumber"],
            seatNumber: event["seatNumber"],
            ticketCost: event["ticketCost"],
        }
    );

    // add ticket id to flight's seats array
    flight["seats"].push(event["ticketId"]);

    // update flight revenue
    flight["revenue"] += event["ticketCost"];
};