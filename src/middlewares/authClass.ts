import tokenManager from '../helpers/token.manager';

module.exports = function(req, res, next) {
  let token = req.header('authorization');
  const reqUser = tokenManager.decodeToken(token);

  let isAuthorized = reqUser.roles
    .map(m => m.title === 'ادمین' || m.title === 'مدیریت اموزش')
    .includes(true);
  if (reqUser.userType !== 'superAdmin' && !isAuthorized) {
    return res.status(403).send('شما دسترسی ندارید inja!');
  }
  next();
};
