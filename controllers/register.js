const express = require('express')
const {
    Sequelize,
    DataTypes
} = require('sequelize')
const bcrypt = require('bcrypt');
const User = require('../models/user')



async function registerUser (req, res)  {

    const data = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(data.password, saltRounds);

    // Save user data to database

   const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword
   })


    // Send response to client
    res.json({
        message: 'User registered successfully'
    });

}

module.exports = registerUser;