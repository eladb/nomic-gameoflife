var async = require('async');

module.exports = function(rl, callback) {
  return rl.question('', function(iterations) {
    return rl.question('', function(width_height) {
      width_height = width_height.split(' ');
      if (width_height.length !== 2) {
        return callback(new Error('syntax error: syntax is `w h`'));
      }

      var width = parseInt(width_height[0]);
      var height = parseInt(width_height[1]);

      return async.timesSeries(height, function(n, cb) {
        return rl.question('', function(row) {
          var cols = row.split(' ');
          if (cols.length !== width) {
            return cb(new Error('syntax error. each row should consist of exactly ' + width + ' values of `0` or `1`'));
          }

          return cb(null, cols);
        });

      }, function(err, matrix) {
        if (err) return callback(err); // propogate error upwards
        return callback(null, {
          width: width,
          height: height,
          iterations: iterations,
          matrix: matrix
        });
      });
    });
  });
}