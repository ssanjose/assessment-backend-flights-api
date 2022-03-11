// checks seat within a flight
export const checkSeatInFlight = (flights, tickets, flightNumber, seatNumber) => {
    // check if flight exists
    let flight = flights.get(flightNumber);
    let exist = false;

    if (flight) {
        flight["seats"].forEach(seat => {
            let ticket = tickets.get(seat);
            if (ticket && ticket["seatNumber"] === seatNumber)
                exist = true;
        });
    }

    return exist;
};