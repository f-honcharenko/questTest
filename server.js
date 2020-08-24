const express = require('express');
const bodyPaster = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const config = require('config');
const mongoose = require('mongoose');
const User = require('./models/user')
const Group = require('./models/group')
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

            //Make it for vuexs
            // login: 1,
            // email: 1,
            
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
                const user = {login: result.login, email: result.email};
                const token = jwt.sign({
                    userId: result._id
                }, config.jwt.secret);
                return res.status(200).json({
                    title: 'login succses',
                    message: 'aouthorized',
                    token,
                    user
                });
            }
        });

});

//grabing user info
app.get('/user', (req, res, next)=>{
    let token = req.headers.token;
    jwt.verify(token, config.jwt.secret, (err,decoded)=>{
        if (err) return res.status(401).json({
            title:'unauthorized',
            message:'invalid token',
            err
        });
        //token is valid
        User.findOne(
            {_id:decoded.userId},
            {login:1, email:1},
            (err, user) =>{
            if (err) return console.log(err);
            return res.status(200).json({
                title:'authroizated',
                message:'all is good',
                user:{
                    login: user.login,
                    email: user.email,
                }
            }) 
        });
    });
});


//FIXME ADD JWT
app.post('/groupCreate', (req, res, next) => {
    console.log(req.body);

    const newGroup = new Group({
        groupName: req.body.groupName,
        owner: req.body.owner,
    });

    newGroup.save(err => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                title: 'error',
                message: err
            });
        } else {
            console.log('//GROUP ADD succses');
            return res.status(200).json({
                title: 'group added',
                message: ''
            });
        }
    });
});