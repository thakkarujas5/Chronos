const express = require('express')

function getMillisecondsDifference(userInputTime) {
    // userInputTime format: 'HH:mm' (24-hour format, UTC time zone)
    const [userHours, userMinutes] = userInputTime.split(':').map(Number);
  
    // Get the current time in UTC
    const now = new Date();
  
    // Create a new Date object with the current date and time in UTC
    const currentTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), 0));
  
    // Create a new Date object with the user-input time and the current date in UTC
    const userTime = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), userHours, userMinutes, now.getUTCSeconds(), 0));
  
    // Calculate the time difference in milliseconds
    const timeDifferenceInMilliseconds = userTime.getTime() - currentTime.getTime();
  
    return timeDifferenceInMilliseconds;
  }

  module.exports = getMillisecondsDifference