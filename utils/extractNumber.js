const express = require('express')

function extractNumbersFromString(inputString) {
    const regex = /\d+/g;
    const numbersArray = inputString.match(regex);

    // Convert the extracted numbers to integers (optional step)
    const numbers = numbersArray.map((numString) => parseInt(numString, 10));

    return numbers;
}

module.exports = extractNumbersFromString