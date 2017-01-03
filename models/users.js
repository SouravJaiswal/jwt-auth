var mongoose = require('mongoose');
var config = require('../config/index');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});


UserSchema.pre('save', function(next) {
    if (this.isModified('password')) return next();
    bcrypt.hash(this.password, config.saltRounds, (err, hash) => {
        if(err) return next(err);
        user.password = hash;
        next();
    });
});



module.exports = mongoose.model('User', UserSchema);


