// **************************************************
// function for converting dates to ISO 8601 format
// Input: date, boolean for determining the format
// Output: string (dd/mm/yyyy hh:mm:ss)
// **************************************************

const extractIsoDate = (isDeadline: boolean, date?: string) => {
    const dateFormat = date ? new Date(date) : new Date();

    const day = dateOffset(dateFormat.getUTCDate());
    const month = dateOffset(dateFormat.getUTCMonth() + 1);
    const year = dateFormat.getFullYear();
    const hours = dateOffset(dateFormat.getHours());
    const minutes = dateOffset(dateFormat.getMinutes());
    const seconds = dateOffset(dateFormat.getSeconds());

    const formattedDate =
    isDeadline
    ?
    year + '-' + month + '-' + day
    :
    day + '/' + month + '/' + year + " " + hours + ":" + minutes + ":" + seconds

    return formattedDate;
}

const dateOffset = (datePart: number) => {
    let formattedDatePart;

    datePart < 10
    ?
    formattedDatePart = '0' + datePart.toString()
    :
    formattedDatePart = datePart.toString()

    return formattedDatePart;
}

export default extractIsoDate;