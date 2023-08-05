const redis = require('redis')
const Redis = require('ioredis');
const express = require('express')

const pub = new Redis()

module.exports = pub;