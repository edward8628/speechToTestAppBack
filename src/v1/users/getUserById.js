const debug = require('debug')(`${process.env.APPNAME}:getUserById`);
const User = require('../../utils/models/user');

const getUserById = (req, res, next) => {
  debug('Entering getUserById')
  const useremail = req.params.useremail;

  User.findOne({email: useremail.toLowerCase()}, function(err, user) {
    if (err) {return next(err)}
    if (!user) {return res.status(422).json({error: "No user is found"})};
    if (user) {
      return res.status(200).json(user);
    }
  });
}

module.exports = getUserById;