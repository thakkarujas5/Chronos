const express = require('express')

function parseMilliseconds(input) {
    const timeRegex = /(\d+)(d|h|m|s)?/g;
    const matches = input.match(timeRegex);
  
    if (!matches) {
      throw new Error('Invalid input format');
    }
  
    let totalMilliseconds = 0;
  
    for (const match of matches) {
      const value = parseInt(match);
      const unit = match.slice(-1);
  
      switch (unit) {
        case 'd':
          totalMilliseconds += value * 24 * 60 * 60 * 1000;
          break;
        case 'h':
          totalMilliseconds += value * 60 * 60 * 1000;
          break;
        case 'm':
          totalMilliseconds += value * 60 * 1000;
          break;
        case 's':
          totalMilliseconds += value * 1000;
          break;
        default:
          throw new Error('Invalid time unit');
      }
    }
  
    return totalMilliseconds;
  }

  module.exports = parseMilliseconds;