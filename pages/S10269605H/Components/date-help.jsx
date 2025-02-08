/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

// converts a js date object to a unix timestamp (seconds since 1970)
export const convertDateToUnixTimestamp = (date) => {
    if (!date) {
        throw new Error("Invalid date input: Date is null or undefined");
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date format: Cannot convert to Date object");
    }

    return Math.floor(parsedDate.getTime() / 1000); // convert milliseconds to seconds
};

// Converts a unix timestamp (seconds) to a formatted date string
export const convertUnixTimestampToDate = (unixTimestamp) => {
    if (!unixTimestamp || isNaN(unixTimestamp)) {
        throw new Error("Invalid Unix Timestamp: Expected a valid number");
    }

    const milliseconds = unixTimestamp * 1000; // convert seconds to milliseconds
    return new Date(milliseconds).toLocaleDateString("en-US"); // return formatted date
};

// create new date by adding/subtracting days, weeks, months, or years
export const createDate = (date, days = 0, weeks = 0, months = 0, years = 0) => {

    //handle any exceptions
    if (!date) {
        throw new Error("Invalid date input: Date is null or undefined");
    }

    const newDate = new Date(date);

    if (isNaN(newDate.getTime())) {
        throw new Error("Invalid date format: Cannot convert to Date object");
    }

    // Modify the date based on the given parameters
    newDate.setDate(newDate.getDate() + days + 7 * weeks);
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setFullYear(newDate.getFullYear() + years);

    return newDate;
};
