var 

gulp       = require('gulp'),
purescript = require('gulp-purescript'),
concat     = require('gulp-concat'),
gulpif     = require('gulp-if'),
gulpFilter = require('gulp-filter'),
express    = require('express'),
runSq      = require('run-sequence'),
karma      = require('gulp-karma'),

paths      = {
  test : {
    src : [
      "bower_components/chai/chai.js",
      "bower_components/js-yaml/dist/js-yaml.js",
      "bower_components/purescript-*/src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs.hs",
      "src/**/*.purs",
      "tests/**/*.purs"
    ],
    dest : 'tmp'
  },
  example : {
    src : [
      "bower_components/pixi/bin/pixi.dev.js", 
      "bower_components/jquery/dist/jquery.js",
      "bower_components/js-yaml/dist/js-yaml.js",
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
    main : true,
    runtimeTypeChecks : false,
    externs : "extern.purs"
  },
  example : {
    output : 'Main.js',
    main : true,
    modules : ["Main"],
    externs : "extern.purs"
  }
},

port       = 3333,
server     = express(),

build = function(k){
  return function(){

    var x   = paths[k],
        o   = options[k],
        psc = purescript.psc(o),
        dot = purescript.dotPsci();

      psc.on('error', function(e){
        console.error(e.message);
        psc.end();  
      });

      gulp.src(x.src)
        .pipe(gulpif(/purs/,  dot));

      return gulp.src(x.src)
        .pipe(gulpif(/purs/,  psc))
        .pipe(concat(o.output))
        .pipe( gulp.dest(x.dest));
 
  };
}; // var

gulp.task('build:test',    build('test'));
gulp.task('build:example', build('example'));

gulp.task('test:unit', function(){
  setTimeout(function(){
    gulp.src(options.test.output)
      .pipe(karma({
        configFile : "./tests/karma.conf.js",
        noColors   : true,
        action     : "run"
      }));
  }, 2000);
});

gulp.task('watch', function(){ 
  gulp.watch(paths.example.src, ['build:example']); 
});

gulp.task('serve', function(){ 
  console.log("listening on port " + port);
  server.use(express.static('./example'));
  server.listen(port); 
});

gulp.task('docgen', function(){
  var noBower = gulpFilter(["*", "!bower_components/**/*"]);
  gulp.src("src/**/*.purs")
    .pipe(purescript.docgen())
    .pipe( gulp.dest("DocGen.md"));
});

gulp.task('default', ['build:example','watch','serve']);
gulp.task('test',    function(){ runSq('build:test','test:unit'); });
gulp.task('travis',  ['build:example', 'test']);