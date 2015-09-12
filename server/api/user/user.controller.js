'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var vols= ["AE15B004",
"AE15B006",
"AE15B007",
"AE15B009",
"AE15B012",
"AE15B017",
"AE15B018",
"AE15B022",
"AE15B024",
"AE15B025",
"AE15B027",
"AE15B033",
"AE15B034",
"AE15B035",
"AE15B041",
"AE15B043",
"AE15B044",
"AE15B045",
"AE15B055",
"AE15B057",
"BE15B008",
"BE15B016",
"BE15B019",
"BE15B024",
"BE15B025",
"BE15B027",
"BE15B028",
"BE15B030",
"BS15B001",
"BS15B002",
"BS15B007",
"BS15B008",
"BS15B009",
"BS15B020",
"BS15B023",
"BS15B024",
"BS15B025",
"BS15B032",
"CE15B011",
"CE15B022",
"CE15B029",
"CE15B035",
"CE15B036",
"CE15B039",
"CE15B045",
"CE15B060",
"CE15B062",
"CE15B064",
"CE15B070",
"CE15B074",
"CE15B079",
"CE15B088",
"CE15B089",
"CE15B091",
"CE15B095",
"CH15B001",
"CH15B002",
"CH15B003",
"CH15B005",
"CH15B009",
"CH15B011",
"CH15B014",
"CH15B015",
"CH15B016",
"CH15B020",
"CH15B023",
"CH15B024",
"CH15B026",
"CH15B027",
"CH15B028",
"CH15B031",
"CH15B033",
"CH15B034",
"CH15B035",
"CH15B037",
"CH15B038",
"CH15B039",
"CH15B040",
"CH15B041",
"CH15B048",
"CH15B050",
"CH15B051",
"CH15B052",
"CH15B054",
"CH15B061",
"CH15B064",
"CH15B067",
"CH15B073",
"CH15B074",
"CH15B080",
"CH15B083",
"CH15B086",
"CH15B088",
"CH15B090",
"CS15B008",
"CS15B009",
"CS15B010",
"CS15B011",
"CS15B016",
"CS15B025",
"CS15B026",
"CS15B027",
"CS15B037",
"CS15B045",
"CS15B046",
"CS15B047",
"ED15B010",
"ED15B011",
"ED15B013",
"ED15B022",
"ED15B029",
"ED15B039",
"ED15B042",
"ED15B045",
"ED15B050",
"ED15B052",
"ED15B055",
"EE15B001",
"EE15B002",
"EE15B005",
"EE15B008",
"EE15B011",
"EE15B012",
"EE15B013",
"EE15B018",
"EE15B025",
"EE15B027",
"EE15B032",
"EE15B047",
"EE15B051",
"EE15B052",
"EE15B054",
"EE15B055",
"EE15B056",
"EE15B059",
"EE15B063",
"EE15B065",
"EE15B075",
"EE15B076",
"EE15B081",
"EE15B082",
"EE15B083",
"EE15B085",
"EE15B088",
"EE15B089",
"EE15B095",
"EE15B105",
"EE15B121",
"EP15B001",
"EP15B004",
"EP15B006",
"EP15B013",
"EP15B020",
"EP15B021",
"EP15B023",
"EP15B030",
"HS15H001",
"HS15H004",
"HS15H005",
"HS15H006",
"HS15H007",
"HS15H008",
"HS15H009",
"HS15H010",
"HS15H011",
"HS15H013",
"HS15H014",
"HS15H015",
"HS15H017",
"HS15H018",
"HS15H019",
"HS15H020",
"HS15H021",
"HS15H023",
"HS15H024",
"HS15H025",
"HS15H026",
"HS15H028",
"HS15H029",
"HS15H030",
"HS15H031",
"HS15H034",
"HS15H036",
"HS15H037",
"HS15H038",
"HS15H039",
"HS15H041",
"HS15H043",
"HS15H044",
"HS15H045",
"HS15H046",
"HS15H048",
"HS15H050",
"ME15B001",
"ME15B003",
"ME15B004",
"ME15B005",
"ME15B006",
"ME15B007",
"ME15B008",
"ME15B010",
"ME15B019",
"ME15B028",
"ME15B034",
"ME15B035",
"ME15B036",
"ME15B038",
"ME15B040",
"ME15B042",
"ME15B044",
"ME15B045",
"ME15B048",
"ME15B049",
"ME15B055",
"ME15B056",
"ME15B057",
"ME15B071",
"ME15B076",
"ME15B095",
"ME15B096",
"ME15B097",
"ME15B101",
"ME15B103",
"ME15B111",
"ME15B112",
"ME15B120",
"ME15B137",
"ME15B138",
"MM15B001",
"MM15B004",
"MM15B006",
"MM15B009",
"MM15B010",
"MM15B011",
"MM15B014",
"MM15B020",
"MM15B023",
"MM15B024",
"MM15B026",
"MM15B031",
"MM15B032",
"MM15B035",
"MM15B046",
"MM15B048",
"NA15B001",
"NA15B002",
"NA15B003",
"NA15B006",
"NA15B009",
"NA15B020",
"NA15B022",
"NA15B023",
"NA15B028",
"NA15B029",
"NA15B033",
"NA15B034",
"NA15B036",
"NA15B038",
"NA15B039",
"NA15B040",
"NA15B042",
"NA15B043",
"NA15B046",
"PH15B007",
"PH15B008",
"PH15C024"];

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  for(i = 0; i < vols.length; i++){
    if(req.body.rollNumber.toUpperCase() === vols[i]){
      var newUser = new User(req.body);
      newUser.provider = 'local';
      newUser.role = 'user';
      newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
        res.json({ token: token });
      });
    }
  }
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
