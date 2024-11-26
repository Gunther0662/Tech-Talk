const router = require('express').Router();
const { Post, User } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: ['username']
    });

    const postData = await Post.findAll({
      where: {
        userId: req.session.user_id
      }
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    const user = userData.get({ plain: true })

    
    res.render('dashboard', {
      posts,
      username: user.username,
      logged_in: req.session.logged_in,
      dashboard: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/new', withAuth, async (req, res) => {
    res.render('newPost', {
      dashboard: true,
      logged_in: req.session.logged_in
    });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('editPost', {
        dashboard: true,
        post,
        logged_in: req.session.logged_in,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;