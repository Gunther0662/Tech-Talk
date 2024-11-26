const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  const withApiAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.status(403).json({ message: 'you must be logged in to perform this action' });
    } else {
      next();
    }
  };
  
  const withoutAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      next();
    } else {
      res.redirect('/')
    }
  };
  
  module.exports = { withAuth, withApiAuth, withoutAuth };
  