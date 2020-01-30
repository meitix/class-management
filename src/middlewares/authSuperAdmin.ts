import tokenManager from '../helpers/token.manager';

module.exports = function(req, res, next) {
  let token = req.headers.authorization;
  const reqUser = tokenManager.decodeToken(token);
  if (reqUser.userType !== 'superAdmin') {
    return res.status(403).send('شما دسترسی ندارید!');
  }
  next();
};
