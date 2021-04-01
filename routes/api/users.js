const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require("bcryptjs");
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
// const password = require("password");
const validateRegisteredInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisteredInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }


    User.findOne({ username: req.body.username })
    .then(user => {
        if(user){
            return res.status(400).json({username: 'A user is already registered with that username'})
            
        }else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err, salt)  => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user => 
                            {
                                User.findOne({username: user.username})
                                    .then(user => {
                                        const payload = {
                                            id: user.id,
                                            username: user.username,
                                        }
                                        jwt.sign(
                                            payload,
                                            keys.secretOrKey,
                                            { expiresIn: 3600 },
                                            (err, token) => {
                                                res.json({
                                                    success: true,
                                                    token: 'Bearer ' + token
                                                });
                
                                            }
                                        )

                                    })

                            }
                        ).catch(err => console.log(err))
                })
            })
        }
    })
})

router.post('/login', (req, res) => {
    const {errors, isValid } = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }) //.find will return an array instead of Obj
        .then( user => {
            if(!user){
                return res.status(404).json({username: 'This user does not exist.'});
            }

            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if(isMatch){
                        // res.json({msg: 'Success!'}); test
                        const payload = {
                            id: user.id,
                            username: user.username
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        )
                    }else{
                        return res.status(400).json({passpord: 'Incorrect password'});
                    }
                })
        })
})


module.exports = router;