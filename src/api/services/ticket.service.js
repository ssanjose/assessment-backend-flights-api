
// Uploads ticket to the app.locals.tickets Map
export const uploadTicket = (flights, tickets, event) => {
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
    flights.get(event["flightNumber"]).seats.push(event["ticketId"]);
};