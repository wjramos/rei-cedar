var gulp = require( 'gulp' );
var a11y = require( 'gulp-a11y' );
var pa11y = require( 'gulp-pa11y' );
var pkg = require( '../package.json' );
var A11Y_OPTIONS = pkg.a11y;
var PA11Y_OPTIONS = pkg.pa11y;

// var PATHS = {
//     SRC: path.join( __dirname, '../src' ),
//     DIST: path.join( __dirname, 'dist' ),
//     DOCS_SRC: path.join( __dirname, 'docs_src' ),
//     DOCS_DIST: path.join( __dirname, '../docs_dist' ),
//     DOCS_TEMPLATES: path.join( __dirname, 'docs_src', '_includes', 'markup-templates' ),
//     LESS: path.join( __dirname, 'node_modules' ), 
//     TEST: path.join( __dirname, 'test' ), 
// };

// Audit all experimental accessibility
gulp.task( 'accessibility', () => pa11y( PA11Y_OPTIONS )() );

// Audit compiled docs. This task is slower, but will cover more. It can give
// color recommendations.
// gulp.task( 'accessibility:audit-docs', [ 'docs' ], () =>
//     gulp.src( path.join( PATHS.DOCS_DIST, 'components', 'index.html' ) )
//     .pipe( a11y( A11Y_OPTIONS ) )
//     .pipe( a11y.reporter() )
// );

// --[ Accessibility Audits - EXPERIMENTAL ]------------------------------------
// Audit using pa11y.
// gulp.task( 'accessibility:audit-pa11y', () => pa11y( PA11Y_OPTIONS )() );