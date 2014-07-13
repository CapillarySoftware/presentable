var 

gulp       = require('gulp'),
purescript = require('gulp-purescript'),
shell      = require('gulp-shell'),
clean      = require('gulp-clean'),
express    = require('express'),

paths      = {
  src : {
    src : [
      "bower_components/purescript-*/src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs.hs",
      "src/**/*.purs"
    ],
    dest : "lib",
  },
  test : {
    src : [
      "bower_components/purescript-*/src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs.hs",
      "src/**/*.purs",
      "tests/**/*.purs"
    ],
    dest : 'tmp'
  },
  example : {
    src : [
      "bower_components/purescript-*/src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs.hs",
      "src/**/*.purs",
      "example/**/*.purs"
    ],
    dest : "example/js"
  }
},

options    = {
  src :{
    output : 'Presentable.js'
  },
  test :{
    output : 'Test.js'
  },
  example : {
    output : 'Main.js',
    main : true
  }
},

port       = 3333,
server     = express(),

compile    = function(paths, options) {
  return function() {
    // We need this hack for now until gulp does something about
    // https://github.com/gulpjs/gulp/issues/71
    var psc = purescript.psc(options);
    psc.on('error', function(e) {
      console.error(e.message);
      psc.end();
    });
    return gulp.src(paths.src)
      .pipe(psc)
      .pipe(gulp.dest(paths.dest));
  };
};

server.use(express.static('./example'));

gulp.task('build-src',     compile(paths.src,     options.src       ));
gulp.task('build-test',    compile(paths.test,    options.test      ));
gulp.task('build-example', compile(paths.example, options.example   ));


gulp.task('run-test', function(){
  shell([ 'node ./tmp/Test.js' ]);
});

gulp.task('watch', function(){ 
  gulp.watch([paths.src.src, paths.example.src], ['build-example']); 
});

gulp.task('serve', function(){ 
  console.log("listening on port " + port);
  server.listen(port); 
});

gulp.task('default', ['build-src']);
gulp.task('example', ['build-example','watch','serve']);
gulp.task('test',    ['build-test','run-test']);