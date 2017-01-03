var passport = require('passport');
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJwt;
var config = require('../config/index');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJWT.fromAuthHeader();
    opts.secretOrKey = config.jwtSecret;
    passport.use(new JWTStrategy(opts, function(jwt_payload, done){
        console.log(jwt_payload);
        done(null, jwt_payload);
    }));
}