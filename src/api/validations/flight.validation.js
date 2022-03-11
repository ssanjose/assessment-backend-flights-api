// validate flight
export const validateFlight = (flights, event) => {
    // get flight from flight map
    let flight = flights.get(event["flightNumber"]);

    if (!flight)
        return 0;

    if (flight["flightDate"] !== event["flightDate"])
        return 1;

    return flight;
};