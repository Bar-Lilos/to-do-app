// **************************************************
// function for recieving tomorrow's date
// **************************************************

export default function getTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return tomorrow;
}