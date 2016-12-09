'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Wcg1993hymnal Schema
 */
var Wcg1993hymnalSchema = new Schema({
  page: {
    type: Number,
    required: 'Please enter page number'
  },
  approved: {
    type: String,
    default: 'false'
  },
  title: {
    type: String,
    // default: '',
    required: 'Please enter hymn title',
    trim: true
  },
  author: {
    type: String,
    required: 'Please enter hymn author',
    trim: true
  },
  authorInfo: {
    type: String,
    required: 'Please enter author information'
  }
  /* user: {
    type: Schema.ObjectId,
    ref: 'User'
  } */
});

mongoose.model('Wcg1993hymnal', Wcg1993hymnalSchema);
