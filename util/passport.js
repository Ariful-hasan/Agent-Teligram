const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/userMode');
const Agent = require('../models/agentModel');

module.exports = (passport) => {
    passport.use(
        "user-login",
        new LocalStrategy ({usernameField: 'email'}, (email, password, done) => {
            //* Match User
            //console.log(email);
            
            User.findOne({email: email})
            .then(user => {
                if (!user){
                    return done(null, false, {message: 'That email is not registerd'});
                }

                //* Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch){
                        return done(null, user)
                    } else {
                        return done(null, false, {message: 'Password incorrect'});
                    }
                });
            })
            .catch(err => console.log(err))
        })
    );


    /**
     * Agent Local Passport
     */
    passport.use(
        "agent-login",
        new LocalStrategy({ usernameField: 'userid' }, (userid, password, done) => {
            Agent.findOne({ userid: userid })
            .then(user => {
                
                if (!user) {
                    return done(null, false, { message: "That user is not registerd" });
                }
    
                //* Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
    
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Password incorrect" });
                }
                });
            })
            .catch(err => console.log(err));
        })
    );




    // passport.serializeUser((user, done) => {
    //   done(null, user.id);
    // });

    // passport.deserializeUser((id, done) => {
    //   User.findById(id, (err, user) => {
    //     done(err, user);
    //   });
    // });

    
    /**
     * For Multiple Local User
     */
    passport.serializeUser((user, done) => {    
        done(null, user);
      });
    passport.deserializeUser((user, done) => {
        //console.log(user);
        let mod = user.type == "A" ? Agent : User;
        mod.findById(user._id, (err, user) => {  
            console.log(user);
          done(err, user);
        });
      });

}

    