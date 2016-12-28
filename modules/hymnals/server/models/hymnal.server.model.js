'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Hymnal Schema
 */
var HymnalSchema = new Schema({
  page: {
    purple: { type: Number },
    wcg: { type: Number },
    ucgv1: { type: Number },
    ucgv2: { type: Number },
    lcg: { type: Number },
    cogwa: { type: Number }
  },
  approved: {
    type: String,
    default: 'false'
  },
  title: {
    type: String,
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
});

mongoose.model('Hymnal', HymnalSchema);
