module.exports = function(config) {
  config = config || {};
  if (!('width' in config)) throw new Error('`config.width` is required');
  if (!('height' in config)) throw new Error('`config.height` is required');
  if (!('matrix' in config)) throw new Error('`config.matrix` is required');

  var matrix = config.matrix;
  var width = config.width;
  var height = config.height;

  var obj = {};
  obj.iterate = iterate;
  obj.write_matrix = write_matrix;
  return obj;

  // --

  // perform a single iteration on the matrix and replace with a new one
  function iterate() {
    var next_matrix = [];

    for (var y = 0; y < height; ++y) {
      var next_row = [];
      next_matrix.push(next_row);
      
      for (var x = 0; x < width; ++x) {
        var current = { x: x, y: y };

        var alive_neighbours = neighbours(current).reduce(function(sum, coords) {
          return sum += get(coords);
        }, 0);

        var alive = get(current); // start with current value or cell

        if (alive) {
          // if cell is alive, it dies if it has less than 2 live neighbours OR more than 3.
          if (alive_neighbours < 2 || alive_neighbours > 3) {
            alive = 0;
          }
        }
        else {
          // cell is dead it will become alive if it has exactly 3 live neighbours
          if (alive_neighbours === 3) {
            alive = 1;
          }
        }

        next_row.push(alive);
      }
    }

    // replace with next matrix
    matrix = next_matrix;
  }

  function write_matrix(output) {
    matrix.forEach(function(row) {
      row.forEach(function(col) {
        output.write(col.toString());
        output.write(' ');
      });

      output.write('\n');
    });
  }

  // returns `true` or `false` based on whether the cell is alive or dead
  function get(coords) {
    return parseInt(matrix[coords.y][coords.x]); // make sure we always return an int
  }

  // return the set of neighbouring coordinates
  function neighbours(coords) {
  
    // mask is used to iterate over all neighbours (relative to `coords`)    
    var mask = 
    [
      [ -1, -1 ], [ 0, -1 ], [ 1, -1 ],
      [ -1,  0 ],            [ 1,  0 ],
      [ -1,  1 ], [ 0,  1 ], [ 1,  1 ],
    ];

    var neighbours = [];

    mask.forEach(function(pair) {
      var nx = (coords.x + pair[0]).mod(width);
      var ny = (coords.y + pair[1]).mod(height);
      neighbours.push({ x: nx, y: ny });
    });

    return neighbours;
  }

};

// --

// http://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
Number.prototype.mod = function(n) {
  return ((this % n) + n) % n;
};