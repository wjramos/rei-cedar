var gulp = require( 'gulp' );

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