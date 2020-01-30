import tokenManager from '../helpers/token.manager';

module.exports = function(req, res, next) {
  let token = req.header('authorization');
  const reqUser = tokenManager.decodeToken(token);

  let isAdmin = reqUser.roles.map(m => m.title === 'ادمین').includes(true);
  if (reqUser.userType !== 'superAdmin' && !isAdmin) {
    return res.status(403).send('شما دسترسی ندارید!');
  }
  next();
};
