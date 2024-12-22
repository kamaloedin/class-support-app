const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

function initialize(passport, getUserCredentialsByUsername, getUserCredentialsById) {
  const authenticateUser = async (username, password, done) => {
    const user = await getUserCredentialsByUsername(username);
    if (user == null) {
      return done(null, false, { message: 'Username or Password Incorrect' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Username or Password Incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    return done(null, await getUserCredentialsById(id));
  });
}

module.exports = initialize;
