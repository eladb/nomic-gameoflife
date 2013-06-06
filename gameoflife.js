var simulation = require('./lib/simulation');
var input = require('./lib/input');

input(function(err, config) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  var result = simulation(config);

  // output
  print_matrix(result);
});


// --

function print_matrix(matrix) {
  matrix.forEach(function(row) {
    row.forEach(function(col) {
      process.stdout.write(col.toString());
      process.stdout.write(' ');
    });

    process.stdout.write('\n');
  });
}