const express = require('express');
const bodyPaster = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const config = require('config');
const mongoose = require('mongoose');
// const User = require(./models/)
const User = require('./models/user')

const app = express();
const ip = config.express.ip;
const port = process.env.PORT || config.express.port;

mongoose.connect(config.mongoose.link,{
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
            console.log('34534');
            return res.status(200).json({
                        title: 'singup success',
                        message: ''
                    });
                }
            });
        }
    });
});