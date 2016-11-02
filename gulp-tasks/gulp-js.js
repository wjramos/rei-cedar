var gulp = require( 'gulp' );
var browserify = require( 'browserify' );
var path = require( 'path' );
var source = require( 'vinyl-source-stream' );
var streamify = require( 'gulp-streamify' );
var sourcemaps = require( 'gulp-sourcemaps' );
var rename = require( 'gulp-rename' );
var uglify = require( 'gulp-uglify' );

var PATHS = {
    SRC: path.join( __dirname, '../src' ),
    DIST: path.join( __dirname, 'dist' ),
    DOCS_SRC: path.join( __dirname, 'docs_src' ),
    DOCS_DIST: path.join( __dirname, 'docs_dist' ),
    DOCS_TEMPLATES: path.join( __dirname, 'docs_src', '_includes', 'markup-templates' ),
    LESS: path.join( __dirname, 'node_modules' ), 
    TEST: path.join( __dirname, 'test' ), 
};

gulp.task( 'js', () =>
    browserify( PATHS.SRC + '/js/main.js' ).bundle()
    .pipe( source( PATHS.SRC + '/js/main.js' ) )
    .pipe( streamify( sourcemaps.init() ) )
    .pipe( rename( {
        dirname: '/',
        basename: 'rei-cedar'
    } ) )
    .pipe( streamify( sourcemaps.write() ) )
    .pipe( gulp.dest( PATHS.DIST ) )
    .pipe( rename( {
        dirname: '/',
        basename: 'rei-cedar',
        suffix: '.min'
    } ) )
    .pipe( streamify( uglify() ) )
    .pipe( gulp.dest( PATHS.DIST ) )
);