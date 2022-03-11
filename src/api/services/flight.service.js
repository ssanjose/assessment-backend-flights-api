export const createFlight = (date, flights, event) => {
    // creates flight map data
    let flight = {
        flightNumber: event["flightNumber"],
        flightDate: event["flightDate"],
        seats: []
    }
    flights.set(event["flightNumber"], flight);

    // add flight number to date flights array
    date["flights"].push(event["flightNumber"]);

    return flight;
}