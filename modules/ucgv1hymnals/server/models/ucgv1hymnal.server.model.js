'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Ucgv1hymnal Schema
 */
var Ucgv1hymnalSchema = new Schema({
  page: {
    type: Number,
    required: 'Please enter page number'
  },
  approved: {
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

mongoose.model('Ucgv1hymnal', Ucgv1hymnalSchema);
