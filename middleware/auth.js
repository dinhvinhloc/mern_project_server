const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //get the token from header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(400).json({ msg: 'no token authentication denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));
    req.user = decoded.user;
    console.log(decoded);
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token not valid' });
  }
};
