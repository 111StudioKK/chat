'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});


module.exports = function(options) {
    function config(template) {
        var plat = (!!template)?template:'dev';

        gutil.log('Deleting old config file');
        $.del(options.src + '/app/config.js');

        gutil.log('Copying config file');
        gulp.src(options.config + '/config.' + plat + '.js')
            .pipe($.rename('config.js'))
            .pipe(gulp.dest(options.src + '/app'));
    }

    gulp.task('config', function () {
        config(process.env.USER);
    });

    gulp.task('config:dev', function () {
        config('dev');
    });

    gulp.task('config:prod', function () {
        config('prod');
    });
};