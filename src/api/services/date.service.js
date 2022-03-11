export const moveFlightToNewDate = (flights, dates, newDate, event) => {
    // get date from date map
    let date = dates.get(flights.get(event["flightNumber"])["flightDate"]);

    // remove flight number from date flights array
    date["flights"].splice(date["flights"].indexOf(event["flightNumber"]), 1);

    // add flight to new date
    newDate["flights"].push(event["flightNumber"]);

    let flight = flights.get(event["flightNumber"]);
    // update flight date
    flight["flightDate"] = event["flightDate"];

    return flight;
}

export const createDate = (dates, event) => {
    // check if date already exists, if not create it
    let date = dates.get(event["flightDate"]);

    if (!date) {
        date = {
            date: event["flightDate"],
            flights: []
        }
        dates.set(event["flightDate"], date);
    }
    return date;
}