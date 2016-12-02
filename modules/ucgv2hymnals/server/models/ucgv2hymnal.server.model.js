'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Ucgv2hymnal Schema
 */
var Ucgv2hymnalSchema = new Schema({
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

mongoose.model('Ucgv2hymnal', Ucgv2hymnalSchema);
