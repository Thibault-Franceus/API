const User = require('../models/User');
const passport = require('passport');
require('../passport/passport');

const signup = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  const user = new User({ username: username });

  try {
    await user.setPassword(password);
    await user.save();
    res.status(200).json({
      "status": "Signup successful"
    });
  } catch (err) {
    res.status(500).json({
      "status": "Signup failed",
      "message": err.message
    });
  }
};

const login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const result = await User.authenticate()(username, password);
  
      if (!result.user) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid username or password'
        });
      }
  
      // Manually handle login without req.login
      return res.status(200).json({
        status: 'Login successful',
        data: {
          user: result.user
        }

      });
    } catch (err) {
      return res.status(500).json({
        status: 'Login failed',
        message: err.message
      });
    }
  };

module.exports.signup = signup;
module.exports.login = login;