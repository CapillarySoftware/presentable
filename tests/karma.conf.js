module.exports = function(config) {
  config.set({
    basePath : "../tmp",
    frameworks : ['mocha'],
    files : [ 'Test.js' ],
    browsers : [ 'PhantomJS' ],
    autoWatch : true,
    singleRun : false,
    plugins : [
      'karma-mocha',
      'karma-phantomjs-launcher'
    ]
  });
};