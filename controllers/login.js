const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user')
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true }); 
const loginSchema = require('../schemas/login')
const validateLogin = ajv.compile(loginSchema)


//const secretKey = process.env.JWT_SECRET;

async function loginUser(req, res)  {
    const {
        email,
        password
    } = req.body;

    const valid = validateLogin(req.body);

    if (!valid) {
        const errors = validateLogin.errors.map((error) => {
            return {
                field: error.dataPath,
                message: error.message
            };
        });
        return res.status(400).json({
            errors
        });
    }

    // Find the user by email
    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if (!user) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }

    // Compare the password with the hashed password
    const passwordMatch = bcrypt.compareSync(password, user.dataValues.password);

    if (!passwordMatch) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }

    // Generate a JWT token
    const token = jwt.sign({
        id: user.dataValues.id,
        email
    }, 'secret', {
        expiresIn: '1h'
    });

    // Send the token as a response to the client
    res.json({
        token
    });
}

module.exports = loginUser