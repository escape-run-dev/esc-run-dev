const Team         = require('../models/Team');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs'); // !!!
const passport      = require('passport');

passport.serializeUser((loggedInTeam, cb) => {
  cb(null, loggedInTeam._id);
});

passport.deserializeUser((teamIdFromSession, cb) => {
  Team.findById(teamIdFromSession, (err, teamDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, teamDocument);
  });
});

passport.use(new LocalStrategy((name, password, next) => {
  Team.findOne({ name }, (err, foundTeam) => {
    if (err) {
      next(err);
      return;
    }

    if (!foundTeam) {
      next(null, false, { message: 'No se ha encontrado ningún equipo' });
      return;
    }

    if (!bcrypt.compareSync(password, foundTeam.password)) {
      next(null, false, { message: 'Contraseña fallida chato.' });
      return;
    }

    next(null, foundTeam);
  });
}));

