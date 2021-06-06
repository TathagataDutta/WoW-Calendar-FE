import {RAID_NAME} from "./StringUtil";

export const displayTime = (dateTime) => {
    const date = new Date(dateTime)
    const timeString = date.toLocaleTimeString()
    const ampm = timeString.slice(-2)
    const hrMin = timeString.slice(0, -6)
    return `${date.toDateString()}  ${hrMin} ${ampm}`
}

export const getRaids = () => {
    return [RAID_NAME, 'Raid 1', 'Raid 2', 'Raid 3', 'Raid 4'];
}