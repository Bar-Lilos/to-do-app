// **************************************************
// function for converting dates to ISO 8601 format
// Input: date
// Output: string (dd/mm/yyyy hh:mm:ss)
// **************************************************

const extractIsoDate = (date?: string) => {
    const dateFormat = date ? new Date(date) : new Date();

    const day = dateOffset(dateFormat.getUTCDate());
    const month = dateOffset(dateFormat.getUTCMonth() + 1);
    const year = dateFormat.getFullYear();
    const hours = dateOffset(dateFormat.getHours());
    const minutes = dateOffset(dateFormat.getMinutes());
    const seconds = dateOffset(dateFormat.getSeconds());

    const formattedDate = day + '/' + month + '/' + year + " " + hours + ":" + minutes + ":" + seconds; 
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