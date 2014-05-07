"use strict";

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('server', function () {
  var productConfig = require('./development-config.json');
  
  if (productConfig['port'] === -1) {
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

gulp.task('default', ['server', ]);