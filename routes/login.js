var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
// var RememberMeStrategy = require('../..').Strategy;
const bcrypt= require('bcrypt')

app.use(express.static('public'));

router.get('/', function (req, res, next) {
    console.log('login')
    if (req.isAuthenticated()) {
        res.redirect('../');
    }
    else{
        res.render('shop/login')
    }
});

router.post('/', passport.authenticate('local', {
    successRedirect: '../',
    failureRedirect: '/product/login',
    failureFlash: true
    }));

passport.use('local', new  localStrategy({passReqToCallback : true}, (req, username, password, done) => {

    loginAttempt();

    async function loginAttempt() {
        // console.log('Dai ca hieu: '+req.body.remember)
        const client = await pool.connect()
        try{
            await client.query('BEGIN')
            var pwd = await bcrypt.hash(password, 5);
            console.log('MaHoa: ' + pwd)
            var currentAccountsData = await JSON.stringify(client.query("SELECT * FROM public.user INNER JOIN public.permission ON public.user.role = public.permission.id WHERE public.user.username = '"+username+"' AND public.user.password = '"+password+"'", function(err, result) {

                if(err) {
                    return done(err)
                }
                if(result.rows[0] == null){
                    return done(null, false);
                }
                else{
                    console.log(result.rows.length);
                    console.log(result.rows[0].username);

                    if (result.rows[0] && result.rows[0].username == username && result.rows[0].password == password) {
                        if (req.body.remember) {
                            console.log('remember')
                            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
                        } else {
                            console.log('no remember')
                            req.session.cookie.expires = false; // Cookie expires at end of session
                        }
                        return done(null, result.rows[0]);
                    } else {
                        return done(null, false);
                    }
                }
            }))
        }
        catch(e){throw (e);}
        };
    }
))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = router;
