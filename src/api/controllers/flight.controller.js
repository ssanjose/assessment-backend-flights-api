import { getFlightWithinDate } from "../services/flight.service.js";
import { validateStartEndDates } from "../validations/date.validation.js";

export const getAllFlights = (req) => {
    try {
        // validate start and end query dates
        let dateValidationMessage = validateStartEndDates(req.query["startDate"], req.query["endDate"]);

        if (dateValidationMessage !== "") {
            return {
                statusMessage: "failed",
                data: dateValidationMessage
            };
        }

        return {
            statusMessage: "success",
            data: getFlightWithinDate(req.app.locals.flights,
                req.app.locals.dates,
                req.app.locals.tickets,
                req.query["startDate"],
                req.query["endDate"])
        }
    }
    catch (error) {
        console.log(error);
        return { status: "failed", data: error };
    }
}