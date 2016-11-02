var gulp = require( 'gulp' );
var a11y = require( 'gulp-a11y' );
var pa11y = require( 'gulp-pa11y' );
var pkg = require( '../package.json' );
var A11Y_OPTIONS = pkg.a11y;
var PA11Y_OPTIONS = pkg.pa11y;

gulp.task( 'accessibility:audit', [
    'accessibility:audit-templates',
    'accessibility:audit-docs'
] );

// Audit all experimental accessibility
gulp.task( 'accessibility:audit-exp', [
    'accessibility:audit-pa11y'
] );

// Audit templates before they are compiled. This task has the fastest feedback
// loop
gulp.task( 'accessibility:audit-templates', () =>
    gulp.src( path.join( PATHS.DOCS_TEMPLATES, '**', '*.html' ) )
    .pipe( a11y( A11Y_OPTIONS ) )
    .pipe( a11y.reporter() )
);

// Audit compiled docs. This task is slower, but will cover more. It can give
// color recommendations.
gulp.task( 'accessibility:audit-docs', [ 'docs' ], () =>
    gulp.src( path.join( PATHS.DOCS_DIST, 'components', 'index.html' ) )
    .pipe( a11y( A11Y_OPTIONS ) )
    .pipe( a11y.reporter() )
);

// --[ Accessibility Audits - EXPERIMENTAL ]------------------------------------
// Audit using pa11y.
gulp.task( 'accessibility:audit-pa11y', () => pa11y( PA11Y_OPTIONS )() );

gulp.task( 'browserSync-watch', [ 'compile-riot' ], () => {
    browserSync.reload();
} );