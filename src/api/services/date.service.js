export const moveFlightToNewDate = (flights, dates, event) => {
    // get date from date map
    let date = dates.get(event["flightDate"]);

    // remove flights from date flights array
    date["flights"].splice(date["flights"].indexOf(event["flightNumber"]), 1);

    // add flight to new date
    let newDate = dates.get(event["newFlightDate"]);
    if (!newDate) {
        dates.set(event["newFlightDate"], {
            date: event["newFlightDate"],
            flights: [event["flightNumber"]]
        });
    }
    else
        newDate["flights"].push(event["flightNumber"]);

    // update flight date
    flights.get(event["flightNumber"])["flightDate"] = event["flightDate"];
}