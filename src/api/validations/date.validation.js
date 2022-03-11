export const validateDate = (date) => {
    // must match YYYY-MM-DD
    const re = /^\d{4}-\d{2}-\d{2}$/;
    return re.test(date);
};

export const validateStartEndDates = (startDate, endDate) => {
    if (!startDate)
        return "startDate is empty";
    if (!endDate)
        return "endDate is empty";

    // validate start and end dates from query using validateDate
    if (!validateDate(startDate))
        return "startDate format is invalid";
    if (!validateDate(endDate))
        return "endDate format is invalid";

    // end date must be after start date
    if (startDate > endDate)
        return "endDate cannot be before startDate";

    return "";
};