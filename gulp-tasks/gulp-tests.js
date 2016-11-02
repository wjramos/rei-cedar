// var gulp = require( 'gulp' );

// // Browserify individual components for test
// gulp.task( 'js:test:browserify-single-components', [ 'js:test:copy' ], done => {

//     gulp.src( [ path.join( PATHS.TEST, '/tmp/js/tests/*.js' ), path.join( PATHS.TEST, '/tmp/js/tests/unit/*.js' ) ], ( err, files ) => {
//         if ( err ) done( err );

//         // browserify all of the files async
//         let tasks = files.map(
//             file => browserify( {
//                 entries: [ file ]
//             } ).bundle()
//             .pipe( source( file ) )
//             .pipe( gulp.dest( '' ) )
//         );

//         // Merge the streams
//         es.merge( tasks )
//             .on( 'end', done );
//     } )
// } );

// // Inject files into js/tests/index.html for testing
// gulp.task( 'js:test:inject', [ 'js:test:browserify-single-components' ], () =>
//     gulp.src( path.join( PATHS.TEST, '/tmp/js/tests/index.html' ) )
//     // Get all test files and inject into index.html
//     .pipe( inject( gulp.src( [ path.join( PATHS.TEST, '/tmp/js/tests/unit/*.js' ) ], {
//         read: false
//     } ), {
//         name: 'tests',
//         relative: true
//     } ) )
//     .pipe( gulp.dest( path.join( PATHS.TEST, '/tmp/js/tests' ) ) )
// );

// // Qunit test the components
// gulp.task( 'js:test:qunit', [ 'js:test:inject' ], () =>
//     gulp.src( path.join( PATHS.TEST, '/tmp/js/tests/index.html' ) )
//     .pipe( qunit( {
//         'timeout': 20
//     } ) )
// );

// // js:clean
// // Before clean/deletion, qunit is run to ensure new files will be written.
// gulp.task( 'js:clean', [ 'js:test:qunit' ], () => del( [ path.join( PATHS.DIST, '**/*.js' ) ] ) );

// // js:post-clean-test
// gulp.task( 'js:test:post-clean', [ 'js:test:qunit' ], () => del( [ path.join( PATHS.TEST, '/tmp/js/*' ) ] ) );

