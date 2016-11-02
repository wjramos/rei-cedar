'use strict';
var path = require( 'path' );
var gulp = require( 'gulp' );
var less = require( 'gulp-less' );
var rename = require( 'gulp-rename' );
var minifyCss = require( 'gulp-cssnano' );
var a11y = require( 'gulp-a11y' );
var pa11y = require( 'gulp-pa11y' );
var csscomb = require( 'gulp-csscomb' );
var inject = require( 'gulp-inject' );
var uglify = require( 'gulp-uglify' );
var streamify = require( 'gulp-streamify' );
var cssmin = require( 'gulp-cssmin' );
var csslint = require( 'gulp-csslint' );
var qunit = require( 'gulp-qunit' );
var sourcemaps = require( 'gulp-sourcemaps' );
var cssLintLessReporter = require( 'gulp-csslint-less-reporter' );
var postcss = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var source = require( 'vinyl-source-stream' );
var browserify = require( 'browserify' );
var glob = require( 'glob' );
var del = require( 'del' );
var es = require( 'event-stream' );
var runSequence = require( 'run-sequence' );
var spawn = require( 'child_process' ).spawn;
var pkg = require( './package.json' );
var globify = require( 'require-globify' );
var bourbon = require( 'node-bourbon' );
var browserSync = require( 'browser-sync' ).create();

var requireDir = require('require-dir');
requireDir('./gulp-tasks');

var SHOULD_STOP_FOR_LINT_FAILURE = false;
var PATHS = {
    SRC: path.join( __dirname, 'src' ),
    DIST: path.join( __dirname, 'dist' ),
    DOCS_SRC: path.join( __dirname, 'docs_src' ),
    DOCS_DIST: path.join( __dirname, 'docs_dist' ),
    DOCS_TEMPLATES: path.join( __dirname, 'docs_src', '_includes', 'markup-templates' ),
    LESS: path.join( __dirname, 'node_modules' ), 
    TEST: path.join( __dirname, 'test' ), 
};

gulp.task( 'default', ['js', 'css']);

gulp.task( 'docs:clean', [
    'docs:clean-dist',
    'docs:clean-copied-from-src',
    'docs:clean-copied-package',
    'docs:clean-copied-less'
] );

gulp.task( 'docs:copy-all', [
    'docs:copy-css',
    'docs:copy-js',
    'docs:copy-package',
    'docs:copy-less'
] );

gulp.task( 'docs', [
    'docs:autoprefixer-css',
    'docs:autoprefixer-examples',
    'docs:csscomb-css',
    'docs:csscomb-examples',
    'docs:cssmin-css',
    'docs:jekyll'
] );

