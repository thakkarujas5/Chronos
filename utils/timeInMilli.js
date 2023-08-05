const express = require('express')

function timeInMilliseconds(userInputTime)
{
  const [userHours, userMinutes] = userInputTime.split(':').map(Number);

  const now = new Date();

  const currentTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), 0, 0));

  const userTime = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), userHours, userMinutes, 0, 0));

  return userTime.getTime();
}

module.exports = timeInMilliseconds