'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  description: String,
  motivation: String,
  active: {type: Boolean, default: true},
  representatives: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  members: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  createdOn: {type: Date, default: Date.now()},
  updatedOn: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Project', ProjectSchema);