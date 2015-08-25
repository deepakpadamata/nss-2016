'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CreditSchema = new Schema({
  reason: String,
  awardedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  awardedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  number: String,
  creditType: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  time: Date
});

module.exports = mongoose.model('Credit', CreditSchema);