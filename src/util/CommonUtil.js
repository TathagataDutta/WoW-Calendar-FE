export const displayTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toDateString()+', '+date.toLocaleTimeString()
}