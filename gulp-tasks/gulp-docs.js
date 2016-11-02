var gulp = require( 'gulp' );

//      /$$$$$$$
//     | $$__  $$
//     | $$  \ $$  /$$$$$$   /$$$$$$$  /$$$$$$$
//     | $$  | $$ /$$__  $$ /$$_____/ /$$_____/
//     | $$  | $$| $$  \ $$| $$      |  $$$$$$
//     | $$  | $$| $$  | $$| $$       \____  $$
//     | $$$$$$$/|  $$$$$$/|  $$$$$$$ /$$$$$$$/
//     |_______/  \______/  \_______/|_______/
//
//
//

// docs:clean-dist: deletes everything in the docs_dist folder
gulp.task( 'docs:clean-dist', () => del( [ path.join( PATHS.DOCS_DIST, '/*' ) ] ) );

// docs:clean-copied-from-src: deletes the copied REI-Cedar.* from docs_src
gulp.task( 'docs:clean-copied-from-src', () => del( [ path.join( PATHS.DOCS_SRC, '/rei-cedar*' ) ] ) );

// docs:clean-copied-package: deletes `/less/variables.less` from docs_src
gulp.task( 'docs:clean-copied-package', () => del( [ path.join( PATHS.DOCS_SRC, '/_data/package.json' ) ] ) );

// docs:clean-copied-variables: deletes `/less/variables.less` from docs_src
gulp.task( 'docs:clean-copied-less', () => del( [ path.join( PATHS.DOCS_SRC, '/_includes/less/*' ) ] ) );

// Build REI-Cedar CSS and copy into docs_src directory
gulp.task( 'docs:copy-css', [ 'docs:clean-copied-from-src' ], () =>
    gulp.src( path.join( PATHS.DIST, '*.css' ) )
    .pipe( gulp.dest( path.join( PATHS.DOCS_SRC ) ) )
);

// Build old Bootstrap JS and copy into the docs_src directory
gulp.task( 'docs:copy-js', [ 'docs:clean-copied-from-src' ], () =>
    gulp.src( path.join( PATHS.DIST, '*.js' ) )
    .pipe( gulp.dest( path.join( PATHS.DOCS_SRC ) ) )
);

// Copy packages to docs_src directory
gulp.task( 'docs:copy-package', [ 'docs:clean-copied-package' ], () =>
    gulp.src( './package.json' )
    .pipe( gulp.dest( path.join( PATHS.DOCS_SRC, '_data' ) ) )
);

// Copy variables to docs_src directory
gulp.task( 'docs:copy-less', [ 'docs:clean-copied-less' ], () =>
    gulp.src( path.join( path.join( PATHS.SRC, '/less/**/*' ) ) )
    .pipe( gulp.dest( path.join( PATHS.DOCS_SRC, '_includes/less' ) ) )
);

// --[ docs:autoprefixer ]----------------------------------------------------------
gulp.task( 'docs:autoprefixer-css', [ 'docs:clean', 'docs:copy-all' ], () =>
    gulp.src( [ 'docs/assets/css/anchor.css', 'docs/assets/css/src/docs.css' ] )
    .pipe( sourcemaps.init() )
    .pipe( postcss( [ autoprefixer( {
        browsers: [ 'last 2 versions' ]
    } ) ] ) )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( gulp.dest( path.join( PATHS.DOCS_DIST, 'css' ) ) )
);

gulp.task( 'docs:autoprefixer-examples', [ 'docs:clean', 'docs:copy-all' ], () =>
    gulp.src( path.join( PATHS.DOCS_SRC, 'docs/examples/**/*.css' ) )
    .pipe( sourcemaps.init() )
    .pipe( postcss( [ autoprefixer( {
        browsers: [ 'last 2 versions' ]
    } ) ] ) )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( gulp.dest( path.join( PATHS.DOCS_DIST, 'docs/examples/' ) ) )
);

// --[ docs:csscomb ]----------------------------------------------------------
gulp.task( 'docs:csscomb-css', [ 'docs:clean', 'docs:copy-all' ], () =>
    gulp.src( [ 'docs/assets/css/anchor.css', 'docs/assets/css/src/docs.css' ] )
    .pipe( csscomb( {
        expand: true,
        cwd: 'dist/css/',
        src: [ '*.css', '!*.min.css' ],
        dest: 'dist/css/'
    } ) )
    .pipe( gulp.dest( path.join( PATHS.DOCS_DIST, 'css' ) ) )
);

gulp.task( 'docs:csscomb-examples', [ 'docs:clean', 'docs:copy-all' ], () =>
    gulp.src( path.join( PATHS.DOCS_SRC, 'docs/examples/**/*.css' ) )
    .pipe( csscomb( {
        expand: true,
        cwd: 'dist/css/',
        src: [ '*.css', '!*.min.css' ],
        dest: 'dist/css/'
    } ) )
    .pipe( gulp.dest( path.join( PATHS.DOCS_DIST, 'docs/examples/' ) ) )
);

// --[ docs:cssmin ]----------------------------------------------------------
gulp.task( 'docs:cssmin-css', [ 'docs:clean', 'docs:copy-all' ], () =>
    gulp.src( PATHS.DOCS_DIST + '/assets/css/src/*.css' )
    .pipe( cssmin() )
    .pipe( rename( {
        dirname: '/',
        suffix: '.min'
    } ) )
    .pipe( gulp.dest( path.join( PATHS.DOCS_DIST, 'css' ) ) )
);

// Build docs CSS and copy into docs src directory
gulp.task( 'docs:less:compile', [ 'docs:clean', 'docs:copy-all' ], () => {
    const lessc = less( {
        paths: [ PATHS.LESS ]
    } ).on( 'error', err => {
        console.log( 'There was a problem compiling the LESS files...' );
        throw new Error( err );
    } ); // Break on less compile errors

    return gulp.src( path.join( PATHS.DOCS_SRC, '/assets/less/docs.less' ) )
        .pipe( lessc )
        .pipe( gulp.dest( path.join( PATHS.DOCS_SRC, '/assets/css/src' ) ) );
} );

gulp.task( 'docs:jekyll', [ 'docs:less:compile' ], gulpCallBack =>
    spawn( 'jekyll', [ 'build' ], {
        stdio: 'inherit'
    } )
    .on( 'exit', code => gulpCallBack( code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code ) )
);