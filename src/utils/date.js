
/**
 * Format a date to given format YYYY/MM/DD HH:MM:SS
 *
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 */
export const formatDate = (date) => {
    let formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    let month  = formattedDate.getMonth() + 1;
    month      = month.toString().length < 2 ? `0${month}` : month;
    let day    = formattedDate.getDate();
    day        = day.toString().length < 2 ? `0${day}` : day;
    let hour   = formattedDate.getHours();
    hour       = hour.toString().length < 2 ? `0${hour}` : hour;
    let minute = formattedDate.getMinutes();
    minute     = minute.toString().length < 2 ? `0${minute}` : minute;
    let second = formattedDate.getSeconds();
    second     = second.toString().length < 2 ? `0${second}` : second;
    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}