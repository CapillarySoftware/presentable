module.exports = function(config) {
  config.set({
    frameworks : ['mocha'],
    files : [
      "../bower_components/chai/chai.js",
      '../tmp/Test.js'
    ],
    browsers : [ 'PhantomJS' ],
    autoWatch : true,
    singleRun : false,
    plugins : [
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher'
    ]
  });
};