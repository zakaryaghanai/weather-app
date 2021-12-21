/* eslint-disable */
import moment from 'moment';

export function getDayName(unixTimestamp){
    return moment.unix(unixTimestamp).format('ddd')
}

export function getFullDate(unixTimestamp){
    return moment.unix(unixTimestamp).format('DD/MM/YYYY')
}

export function getTime(unixTimestamp){
    return moment.unix(unixTimestamp).format('h:mm a')
}