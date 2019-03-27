const express    = require('express');
const router     = express.Router();

const passport   = require('passport');
const bcrypt     = require('bcryptjs')

const Team       = require('../models/Team')

router.post('/signup', (req, res, next) => {

    const {name, password, email} = req.body
  
    if (!name || !password) {
      res.status(400).json({ message: '¡Tu equipo tiene que tener un nombre y una contraseña!' })
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        res.status(400).json({message: "¿Ese email de dónde lo has sacado? Venga, escribe el bueno..."})
    }

    if(password.length < 7){
        res.status(400).json({ message: 'Tu contraseña tiene que tener un mínimo de 8 caracteres' })
        return
    }
  
    Team.findOne({ name }, (err, foundTeam) => {

        if(err){
            res.status(500).json({message: "Algo ha fallado al comprobar el equipo"})
            return
        }

        if (foundTeam) {
            res.status(400).json({ message: 'Ese nombre de equipo ya existe. Vas a tener que elegir otro' })
            return
        }
  
        const salt     = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)
  
        const aNewTeam = new Team ({
            name:name,
            password: hashPass,
            email: email
        })
  
        aNewTeam.save(err => {
            if (err) {
                res.status(400).json({ message: 'Saving user to database went wrong.' })
                return
            }
            
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewTeam, (err) => {

                if (err) {
                    res.status(500).json({ message: 'No hemos podido iniciar sesión después del registro' })
                    return
                }
            
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewTeam)
            })
        })
    })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theTeam, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Algo ha ido mal en la autenticación' });
            return;
        }
    
        if (!theTeam) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theTeam, (err) => {
            if (err) {
                res.status(500).json({ message: 'No hemos podido guardar sesión' });
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theTeam);
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: '¡Ya estás fuera!' })
})


router.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: '¡No puedes pasar!' });
});


module.exports = router
