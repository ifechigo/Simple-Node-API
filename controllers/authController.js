const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        user.save()
        .then(user=>{
            res.json({
                message: 'user added successfully'
            })
        })
        .catch(error=>{
            res.json({
                message: 'an error occured, cannot create user'
            })
        })
    })
}


const login = (req, res, next)=>{
    const username = req.body.username
    const password = req.body.password

    User.findOne({$or: [{email:username}, {phone:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'ahs463FCF#&%chv', {expiresIn: '1h'})
                    res.json({
                        message: 'login successful',
                        token
                    })
                }else{
                    res.json({
                        message: 'password is incorrect'
                    })
                }
            })
        }else{
            res.json({
                messsage: 'user not found'
            })
        }
    })
}

module.exports = {
    register, login
}