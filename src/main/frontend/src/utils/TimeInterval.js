import { TimeInterval } from 'time-interval-js';

export const calculateTimeInterval = (dateAdded) => {
    const date1 = new Date();
    const date2 = new Date(dateAdded);
    const interval = TimeInterval.fromTimeBetweenTwoDates(date1, date2);
    const hours = interval.inHours();
    if (hours < 24) {
        return Math.round(hours) + " hours";
    } else if (hours >= 24 && hours < 168) {
        return Math.floor(hours/24) + " days " + Math.round(hours%24) + " hours" ;
    } else {
        return Math.floor(hours/168) + " weeks " + Math.round((hours%168)/24) + " days";
    }
};