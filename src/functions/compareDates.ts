// **************************************************
// function for comparing two dates
// Input: date1, date2
// Output: true/false
// **************************************************

const compareDates = (date1: Date, date2: Date) => {
    const formattedDate1 = new Date(date1);
    const formattedDate2 = new Date(date2);

    formattedDate1.setHours(0, 0, 0, 0);
    formattedDate2.setHours(0, 0, 0, 0);

    return formattedDate1.getTime() >= formattedDate2.getTime() ? true : false; 
}

export default compareDates;