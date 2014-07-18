var 

gulp       = require('gulp'),
purescript = require('gulp-purescript'),
shell      = require('gulp-shell'),
concat     = require('gulp-concat'),
express    = require('express'),
rimraf     = require('rimraf'),
runSq      = require('run-sequence'),
exec       = require('child_process').exec,

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
    js : [
      "bower_components/history.js/scripts/bundled/html5/native.history.js",
      "bower_components/mocha/mocha.js",
      "bower_components/chai/chai.js"
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
    output : 'Test.js',
    main : true
  },
  example : {
    output : 'Main.js',
    main : true
  }
},

port       = 3333,
server     = express(),


// FUCK YOU GULP! DID THIS EVER WORK? NO IDEA
build = function(k){
  return function(){

    var x   = paths[k],
        o   = options[k],
        psc = purescript.psc(o);

    gulp.task('build:prim', function(){

      psc.on('error', function(e){
        console.error(e.message);
        psc.end();  
      });

      gulp.src(x.src)
        .pipe(psc)
        .pipe( gulp.dest(x.dest) );

    });

    gulp.task('build:concat', function(){
      var finalSrc = [x.dest + '/' + o.output];

      if(x.js){ finalSrc = finalSrc.concat(x.js); }

      gulp.src(finalSrc)
        .pipe( concat(o.output) )
        .pipe( gulp.dest(x.dest) );

    });
 
    runSq('build:prim','build:concat'); 
  };

}; // end var

server.use(express.static('./example'));

gulp.task('build:test',    build('test'));
gulp.task('build:src',     build('src'));
gulp.task('build:example', build('example'));

gulp.task('clean', function(cb){
  rimraf('tmp');
  // rimraf('example/js');
  // rimraf('lib/');
});

gulp.task('test:unit', function(){
  console.log("Running Tests...");
  exec('karma start ./tests/karma.conf.js', function(err, out, serr){
    console.log(out);
    if(err){  return console.log(err); }
    if(out){  return console.log(out); }
    if(serr){ return console.log(serr); }
  });
});

gulp.task('watch', function(){ 
  gulp.watch([paths.src.src, paths.example.src], ['build:example']); 
});

gulp.task('serve', function(){ 
  console.log("listening on port " + port);
  server.listen(port); 
});

gulp.task('default', ['build:src']);
gulp.task('example', ['build:example','watch','serve']);
gulp.task('test',    function(){
  runSq('build:test','test:unit');
});