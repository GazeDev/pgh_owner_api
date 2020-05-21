var Transform = require('stream').Transform,
    util = require('util');

var TransformStream = function() {
  Transform.call(this, {objectMode: true});
};
util.inherits(TransformStream, Transform);

TransformStream.prototype._transform = function(chunk, encoding, callback) {

  if (typeof chunk.originalValue === 'undefined') {
    chunk.originalValue = chunk.value;
  }
  let line = chunk.toString('utf8');
  console.log('line : ', line);

  let array = line.split('	');
  console.log(array.length);
  this.push(line);
  // this.push(chunk);
  callback();
};

module.exports = TransformStream;
