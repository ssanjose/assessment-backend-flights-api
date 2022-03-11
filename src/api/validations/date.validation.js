export const validateDate = (date) => {
    // must match YYYY-MM-DD
    const re = /^\d{4}-\d{2}-\d{2}$/;
    return re.test(date);
};
