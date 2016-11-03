var gulp = require( 'gulp' );
var browserify = require( 'browserify' );
var path = require( 'path' );
var source = require( 'vinyl-source-stream' );
var streamify = require( 'gulp-streamify' );
var sourcemaps = require( 'gulp-sourcemaps' );
var rename = require( 'gulp-rename' );
var uglify = require( 'gulp-uglify' );
var del = require( 'del' );

var PATHS = {
    SRC: path.join( __dirname, '../src' ),
    DIST: path.join( __dirname, 'dist' ),
    DOCS_SRC: path.join( __dirname, 'docs_src' ),
    DOCS_DIST: path.join( __dirname, 'docs_dist' ),
    DOCS_TEMPLATES: path.join( __dirname, 'docs_src', '_includes', 'markup-templates' ),
    LESS: path.join( __dirname, 'node_modules' ), 
    TEST: path.join( __dirname, 'test' ), 
};

gulp.task( 'docs', () => del( [ path.join( PATHS.DOCS_DIST, '/*' ) ] ) );

gulp.task( 'docs:jekyll', [ 'docs:jekyll' ], gulpCallBack =>
    spawn( 'jekyll', [ 'build' ], {
        stdio: 'inherit'
    } )
    .on( 'exit', code => gulpCallBack( code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code ) )
);