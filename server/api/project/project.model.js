'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  description: String,
  motivation: String,
  active: Boolean,
  representatives: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  members: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  createdOn: Date,
  updatedOn: Date
});

module.exports = mongoose.model('Project', ProjectSchema);