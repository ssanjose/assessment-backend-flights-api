// validate flight
export const validateFlight = (flights, event) => {
    /* flight codes
        0 - flight does not exist
        1 - flight date exists and has changed
        2 - flight date exists and has not changed
    */

    // get flight from flight map
    let flight = flights.get(event["flightNumber"]);

    if (!flight)
        return 0;

    if (flight["flightDate"] !== event["flightDate"])
        return 1;

    return 2;
};