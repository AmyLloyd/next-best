const router = require('express').Router();
const { User } = require('../../models');

//Create new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    if (userData.errors && userData.errors.length > 0) {
      console.log("Validation error:", userData.errors);
      res.status(400).json({ message: 'Validation error', errors: userData.errors });
      return;
    }
    if (!userData) {
      console.log("Incorrect email or password")
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
      // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err, "err");
  }
});

//Log in
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      console.log("Incorrect email or password")
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

   // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//Log out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
