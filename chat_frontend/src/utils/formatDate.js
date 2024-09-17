
export function formatDate(date) {
    const newDate =  new Date(date)
    const stringDate = newDate.toDateString()
    const timeString = newDate.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
    return `${stringDate} ${timeString}`
}