"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var nodemon = require('gulp-nodemon');

gulp.task('lint', function () {
  return gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('server', ['lint'], function () {
  var productConfig = require('./development-config.json');
  
  if (productConfig.port === -1) {
    console.log('You need to have a product config defined');
    process.exit(-1);
  }
      
  nodemon({
    script: 'server.js',
    env: productConfig
  })
    .on('restart', function () {
      console.log('restarted node');
    });
});

gulp.task('default', ['lint', 'server']);