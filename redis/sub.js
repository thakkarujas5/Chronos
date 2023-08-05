const redis = require('redis')
const Redis = require('ioredis');
const express = require('express')

const sub = new Redis()

module.exports = sub;