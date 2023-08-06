const express = require('express')
const {
    Sequelize,
    DataTypes
} = require('sequelize')
const bcrypt = require('bcrypt');
const User = require('../models/user')
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true }); 
const registerSchema = require('../schemas/register')
const validateRegister = ajv.compile(registerSchema)



async function registerUser (req, res)  {

    const data = req.body;

    const valid = validateRegister(data);

    if (!valid) {
        const errors = validateRegister.errors.map((error) => {
            return {
                field: error.dataPath,
                message: error.message
            };
        });
        return res.status(400).json({
            errors
        });
    }


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