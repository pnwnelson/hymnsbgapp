'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Purplehymnal Schema
 */
var PurplehymnalSchema = new Schema({
  page: {
    type: Number,
    required: 'Please enter page number'
  },
  popular: {
    type: String
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

mongoose.model('Purplehymnal', PurplehymnalSchema);
