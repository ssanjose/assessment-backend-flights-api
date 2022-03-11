export const createFlight = (flights, event) => {
    // creates flight map data
    flights.set(event["flightNumber"],
        {
            flightNumber: event["flightNumber"],
            flightDate: event["flightDate"],
            seats: [],
        }
    );
}