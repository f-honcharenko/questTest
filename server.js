const express = require('express');
const bodyPaster = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const config = require('config');
const mongoose = require('mongoose');
const User = require('./models/user')
const jwt = require('jsonwebtoken');

const app = express();
const ip = config.express.ip;
const port = process.env.PORT || config.express.port;

mongoose.connect(config.mongoose.link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(cors());
app.use(bodyPaster.json());
app.use(bodyPaster.urlencoded({
    extended: false
}));


app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('Server [http://' + ip + ':' + port + '] was running!');
});

app.post('/signup', (req, res, next) => {
    console.log(req.body);

    const newUser = new User({
        login: req.body.login,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, config.bcrypt.salt)
    });

    User.findOne({
            email: newUser.email
        }, {
            _id: 1
        },
        (err, user) => {
            if (user) {
                console.log('123');
                //User with this email was found
                return res.status(409).json({
                    title: 'Error',
                    message: 'email already used',
                })
            } else {
                newUser.save(err => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({
                            title: 'error',
                            message: err
                        });
                    } else {
                        console.log('//LOGIN succses');
                        return res.status(200).json({
                            title: 'singup success',
                            message: ''
                        });
                    }
                });
            }
        });
});

app.post('/login', (req, res, next) => {
    console.log(req.body);
    //Проверка полей, не пусты ли онм
    if (!req.body.email || !req.body.password) {
        return res.status(406).json({
            title: 'cannot get',
            message: 'some fields are empty'
        });
    }

    // Поиск
    User.findOne({
            email: req.body.email
        }, {
            password: 1,
            _id: 1
        },
        (err, result) => {
            if (err) return req.sataus(500).json({
                title: 'Server error',
                message: 'some error(find user)' + err,
            });
            if (!result) {
                res.status(401).json({
                    title: 'user not found',
                    message: 'user not found'
                });
            }
            //user was founded
            if (result) {
                //incorecet password
                if (!bcrypt.compareSync(req.body.password, result.password)) {
                    return res.status(401).json({
                        title: 'login  falied',
                        message: 'invalid password'
                    });
                }
                //if all is good
                let token = jwt.sign({
                    userId: result._id
                }, config.jwt.secret);
                return res.status(200).json({
                    title: 'login succses',
                    message: 'aouthorized',
                    token
                });
            }
        });

});