var 

gulp       = require('gulp'),
purescript = require('gulp-purescript'),
shell      = require('gulp-shell'),
concat     = require('gulp-concat'),
express    = require('express'),
rimraf     = require('rimraf'),
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
    js : ["bower_components/mocha/mocha.js"],
    dest : 'tmp',
    destFile : 'Test.js'
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

build = function(k){
  return function(){
    var x   = paths[k],
        o   = options[k],
        psc = purescript.psc(o);
    psc.on('error', function(e){
      console.error(e.message);
      psc.end();  
    });
    gulp.src(x.src).pipe(psc);
    gulp.src( [x.dest+'/'+o.output].concat(x.js) )
      .pipe( concat(o.output) )
      .pipe( gulp.dest(x.dest) );
  };
};

// gulp.task('build-src',     compile(paths.src,     options.src       ));
// gulp.task('build-example', compile(paths.example, options.example   ));

server.use(express.static('./example'));

gulp.task('build:test',    build('test'));
gulp.task('build:src',     build('src'));
gulp.task('build:example', build('example'));

gulp.task('clean', function(cb){
  // rimraf('tmp/');
  // rimraf('example/js');
  // rimraf('lib/');
});

gulp.task('test:unit', function(){
  console.log("Running Tests...");
  exec('node ./tmp/Test.js', function(err, out, serr){
    console.log(out);
    if(err){  return console.log(err); }
    if(out){  return console.log(out); }
    if(serr){ return console.log(serr); }
  });
});

gulp.task('watch', function(){ 
  gulp.watch([paths.src.src, paths.example.src], ['build-example']); 
});

gulp.task('serve', function(){ 
  console.log("listening on port " + port);
  server.listen(port); 
});

gulp.task('default', ['build:src']);
gulp.task('example', ['build:example','watch','serve']);
gulp.task('test',    ['build:test','test:unit']);