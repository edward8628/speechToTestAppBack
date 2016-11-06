const debug = require('debug')(`${process.env.APPNAME}:createUser`);
const User = require('../../utils/models/user');

//TODO, add token
const createUser = (req, res, next) => {
  debug('Entering createUser')

  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(422).json({error: "You must provide an email and password"});
  }

  // Check if user already exists, send error if they do
  User.findOne({email: email}, function(err, existingUser) {
    if (err) { return next(err) }
    if (existingUser) {return res.status(422).json({error: "Email taken"})}
    var user = new User({
      email: email,
      password: password
    });
    user.save(function(err) {
      if (err) { return next(err) }
      res.status(200).json({user_id: user._id});
      // res.json({user_id: user._id, token: tokenForUser(user)});
    });
  });
}

module.exports = createUser;
