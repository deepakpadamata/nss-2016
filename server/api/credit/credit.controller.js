'use strict';

var _ = require('lodash');
var Credit = require('./credit.model');

// Get list of credits
exports.index = function(req, res) {
  Credit.find({awardedTo : req.user._id}, function (err, credits) {
    if(err) { return handleError(res, err); }
    return res.json(200, credits);
  });
};

// Get a single credit
exports.show = function(req, res) {
  Credit.findById(req.params.id, function (err, credit) {
    if(err) { return handleError(res, err); }
    if(!credit) { return res.send(404); }
    return res.json(credit);
  });
};

// Creates a new credit in the DB.
exports.create = function(req, res) {
  req.body.time = Date.now();
  req.body.awardedBy = req.user._id;
  if(req.body.creditType != "Project"){
    req.body.project = undefined;
    if(req.user.role == 'managerial'){
      Credit.create(req.body, function(err, credit) {
      if(err) { return handleError(res, err); }
      return res.json(201, credit);
    });
    }
  }
  if(req.body.creditType == "Project"){
    Credit.create(req.body, function(err, credit) {
      if(err) { return handleError(res, err); }
      return res.json(201, credit);
    });
  }
};

// Updates an existing credit in the DB.
exports.update = function(req, res) {
  if(req.body.creditType == "Project"){
    if(req.body._id) { delete req.body._id; }
    Credit.findById(req.params.id, function (err, credit) {
      if (err) { return handleError(res, err); }
      if(!credit) { return res.send(404); }
      var updated = _.merge(credit, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.json(200, credit);
      });
    });
  }
};

// Deletes a credit from the DB.
exports.destroy = function(req, res) {
  if(req.body.creditType == "Project"){
    Credit.findById(req.params.id, function (err, credit) {
      if(err) { return handleError(res, err); }
      if(!credit) { return res.send(404); }
      credit.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.send(204);
      });
    });
  }
};

function handleError(res, err) {
  return res.send(500, err);
}