import { getFlightWithinDate } from "../services/flight.service";
import { validateStartEndDates } from "../validations/date.validation";

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
            data: getFlightWithinDate(req.app.locals.flights, req.app.locals.dates, req.query["startDate"], req.query["endDate"])
        };
    }
    catch (error) {
        console.log(error);
        return { status: "failed", data: error };
    }
}