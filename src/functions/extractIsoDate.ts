// **************************************************
// function for converting dates to ISO 8601 format
// Input: date
// Output: string
// **************************************************

const extractIsoDate = (data: Date) => {
    const day = dayOffset('');
    const month = '';
    const year = '';
    const hours = '';
    const minutes = '';
    const seconds = '';

    const formattedDate = day + '/' + month
}

const dayOffset = (day: string) => {
    const dayNumber = parseInt(day);
    let formattedDay;

    dayNumber < 10
    ?
    formattedDay = ''
    :
    formattedDay = ''

    return formattedDay;
}

export default extractIsoDate;