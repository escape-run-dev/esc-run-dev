const express    = require('express');
const router     = express.Router();

const passport   = require('passport');
const bcrypt     = require('bcryptjs')

const Game       = require('../models/Game')
const Team       = require('../models/Team')

router.post('/signup', (req, res, next) => {
    const {username, password, email} = req.body
  
    if (!username || !password) {
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
  
    Team.findOne({ username }, (err, foundUser) => {

        if(err){
            res.status(500).json({message: "Algo ha fallado al comprobar el equipo"})
            return
        }

        if (foundUser) {
            res.status(400).json({ message: 'Ese nombre de equipo ya existe. Vas a tener que elegir otro' })
            return
        }
  
        const salt     = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)
  
        const aNewTeam = new Team ({
            username:username,
            password: hashPass,
            email: email
        })
  
        aNewTeam.save(err => {
            if (err) {
                res.json({ message: 'No hemos podido guardar el equipo en la base de datos' })
                return
            }

            const newGame = new Game({
                team: aNewTeam._id
            })

            newGame.save(err => {
                if (err){
                    res.json({message: 'Ha fallado guardar la partia'})
                } 

                Team.findByIdAndUpdate(aNewTeam._id, {$addToSet: {games: newGame._id}},{new:true})
                    .then(response => {
                        
                            req.login(aNewTeam, (err) => {
                                if (err) {
                                    res.status(500).json({ message:'Ups! Hemos fallado al logearte'});
                                    return;
                                }
                                

                                res.json(aNewTeam)
                                return   
                        })})
                    .catch(err => console.log(`Algo ${err}`))
                    
                
            })
        })
    })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.json({message: 'Ups! Hemos fallado al logearte' }).status(500)
            return;
        }
    
        if (!theUser) {
            res.status(401).json({message: 'Oye, ese user no existe!'})
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'No hemos podido guardar sesión' });
                return;
            }
            const newGame = new Game ({
                team: theUser._id
            })
            newGame.save()
                .then(gameid => {
                    Team.findByIdAndUpdate(theUser._id, {$addToSet: {games: gameid._id}},{new:true})
                        .then(() => res.status(200).json({theUser,gameid}))
                        .catch((error) => console.log(error))
                })
                .catch(error => console.log(error))
            
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
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


router.post('/setGame'), (req,res,next) => {
    const {data} = req.body
    console.log(data.game)

    Game.findById(data.game.gameId)
        .then(response => console.log())
        .catch(err => console.log(err))

}


module.exports = router
