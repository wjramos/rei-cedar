var gulp = require( 'gulp' );
var del = require( 'del' );
var path = require( 'path' );
var less = require( 'gulp-less' );
var csslint = require( 'gulp-csslint' );
var cssLintLessReporter = require( 'gulp-csslint-less-reporter' );
var sourcemaps = require( 'gulp-sourcemaps' );
var rename = require( 'gulp-rename' );
var pkg = require( '../package.json' );
var csscomb = require( 'gulp-csscomb' );
var postcss = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var minifyCss = require( 'gulp-cssnano' );

/**
 * Define directory paths
 */
var PATHS = {
    /**
     * DIST: REI-Cedar Root
     *
     * NOTE: This is the root of 'REI-Cedar'. In here you
     * will find all of the associate document files that are used to
     * build out the Jeckyll site
     */
    SRC: path.join( __dirname, 'src' ),

    /**
     * DIST: Distribution Artifact Build Directory
     *
     * NOTE: This is the main Build directory for the REI-Cedar
     * This directory contains the main deliverables for the
     * ui framework, namely:
     *     - The tested and minified CSS
     *     - The tested and minifed JS
     *
     * These deliverables are also consumed by the "Pattern Library" site
     * which contains all of the documentation and examples
     * surrounding the REI-Cedar. This directory is to remain otherwise
     * devoid of *any* other files!
     */
    DIST: path.join( __dirname, 'dist' ),

    /**
     * DOCS_SRC: Pattern Lib Root
     *
     * NOTE: This is the root of the "Pattern Library" site
     * which is a consumer of the `REI-Cedar` assets,
     * namely:
     *     - The tested and minified CSS
     *     - The tested and minifed JS
     *
     * This serves as the
     */
    DOCS_SRC: path.join( __dirname, 'docs_src' ),

    /**
     * DOCS_DIST: Pattern Lib Distribution Artifact
     *
     * NOTE: This is the main Build directory for the "Pattern Library" site.
     * This is the directory consumed by the Jekyll site
     */
    DOCS_DIST: path.join( __dirname, 'docs_dist' ),
    DOCS_TEMPLATES: path.join( __dirname, 'docs_src', '_includes', 'markup-templates' ), // Docs templates directory
    LESS: path.join( __dirname, 'node_modules' ), // Less import directory
    TEST: path.join( __dirname, 'test' ), // Specified folder for test / autogenerated files
};

//       /$$$$$$   /$$$$$$   /$$$$$$
//      /$$__  $$ /$$__  $$ /$$__  $$
//     | $$  \__/| $$  \__/| $$  \__/
//     | $$      |  $$$$$$ |  $$$$$$
//     | $$       \____  $$ \____  $$
//     | $$    $$ /$$  \ $$ /$$  \ $$
//     |  $$$$$$/|  $$$$$$/|  $$$$$$/
//      \______/  \______/  \______/
//
//
//

// CSS:Clean
gulp.task( 'css:clean', () => del( [ path.join( '../docs_dist', '**/*.css' ) ] ) );

// Compile the UI framework's Less --> ./dist.
gulp.task( 'css:build', [ 'css:clean' ], () => {

    const lessc = less( {
        paths: [ '../node_modules' ]
    } ).on( 'error', err => {
        console.log( 'There was a problem compiling the LESS files...' );
        throw new Error( err );
    } ); // Break on less compile errors

    const lintLessReporter = cssLintLessReporter().on( 'error', err => {
        // TODO: decide whether to throw the error
        if ( SHOULD_STOP_FOR_LINT_FAILURE ) {
            throw new Error( err );
        }
    } );

    return gulp.src( path.join( PATHS.SRC, '/less/main.less' ) )
        .pipe( sourcemaps.init() )
        .pipe( rename( {
            basename: pkg.name
        } ) ) // Rename the bundle basename to $PROJECT_NAME-$VERSION
        .pipe( lessc ) // Build the dev bundle
        .pipe( csslint() )
        .pipe( lintLessReporter )
        .pipe( csscomb() )
        .pipe( postcss( [ autoprefixer( {
            browsers: [ 'last 2 versions' ]
        } ) ] ) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( PATHS.DIST ) );
} );

// minify the css
gulp.task( 'css:minify', [ 'css:build' ], () =>
    gulp.src( path.join( PATHS.DIST, '/rei-cedar.css' ) )
    .pipe( rename( {
        suffix: '.min'
    } ) ) // Build the minified bundle
    .pipe( minifyCss() )
    .pipe( gulp.dest( PATHS.DIST ) )
);