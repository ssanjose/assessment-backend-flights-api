export const createFlight = (date, flights, event) => {
    // creates flight map data
    let flight = {
        flightNumber: event["flightNumber"],
        flightDate: event["flightDate"],
        revenue: 0,
        seats: []
    }
    flights.set(event["flightNumber"], flight);

    // add flight number to date flights array
    date["flights"].push(event["flightNumber"]);

    return flight;
}

export const getFlightWithinDate = (flights, dates, startDate, endDate) => {
    // get all dates within range in the dates map
    let datesWithinRange = [];
    for (let [key, value] of dates) {
        if (key >= startDate && key <= endDate)
            datesWithinRange.push(value);
    }

    let dateArray = [];

    // iterate through dates
    for (let date of datesWithinRange) {
        let flightsArray = [];
        // get all flights for date and return flightNumber, revenue, and seats and push to flight array
        for (let flightNumber of date["flights"]) {
            let flight = flights.get(flightNumber);

            flightsArray.push({
                flightNumber: flightNumber,
                revenue: flight["revenue"],
                occupiedSeats: flight["seats"]
            });
        }

        dateArray.push({
            date: date["date"],
            flights: flightsArray
        });
    }

    return {
        dates: dateArray
    }
}