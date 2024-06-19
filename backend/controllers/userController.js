//controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jwt');
const dotenv = require('dotenv');
const res = require('express/lib/response');
const req = require('express/lib/request');

dotenv.config();

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        //check id user exists
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({msg:'User already exists'});
        }

        user = new User ({
            name,
            email,
            password,
        });

        //encrypt password

        const salt = await bcrypt.genSalt(10);
        user.password =  await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn : '5 days' },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                    }
                );
        }catch(err) {
            console.error(err.message);
            res.status(500).send('Server ERROR');
        }
};

exports.authUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({ msg: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ msg :'Invalid credentials'});
        }

        const payload = {
            user : {
                id : user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expires : '5 days' },
            (err,token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    }catch(err) {
        console.error(err.message);
        res.status(500).send("Server ERROR");
    }
   
};

