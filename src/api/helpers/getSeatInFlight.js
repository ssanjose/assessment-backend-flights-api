// checks seat within a flight
export const checkSeatInFlight = (flights, flightNumber, seatNumber) => {
    return flights.get(flightNumber)["seats"].includes(seatNumber);
};