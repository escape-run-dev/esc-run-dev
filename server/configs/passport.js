const Team         = require('../models/Team');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs'); // !!!
const passport      = require('passport');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  Team.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(new LocalStrategy((username, password, next) => {

  Team.findOne({ username }, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }

    if (!foundUser) {
      next(null, false, { message: 'No se ha encontrado ningún equipo' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Contraseña fallida, chat@' });
      return;
    }

    next(null, foundUser);
  });
}));

