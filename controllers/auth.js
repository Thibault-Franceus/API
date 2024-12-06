const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passport/passport');
const config = require('config');

const signup = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  const user = new User({ username: username });

  try {
    await user.setPassword(password);
    const result = await user.save();
    let token = jwt.sign({
      uid: result._id,
      username: result.username
    }, config.get('jwt.secret'));

    res.status(200).json({
      "status": "Signup successful",
      "data": {
        "token": token
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
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
      let token = jwt.sign({
        uid: result.user._id,
        username: result.user.username
      }, "SECRET_KEY");
  
      // Manually handle login without req.login
      return res.status(200).json({
        "status": 'Login successful',
        "data": {
          "token": token
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