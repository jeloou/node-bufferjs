(function () {
    "use strict";

    var limit = function(n) {
	if ( typeof n !== 'number' || n > this.length ) {
	    return this
	}

	return this.slice(0, n);

    };

    var concat = function(buffers) {

	var args = Array.prototype.slice.call(arguments);
	var callback = (typeof args[args.length-1] === 'function')? args.pop() : function() {};
	var buffers = ( args.length > 0 && Array.isArray(args[0]) )? args.shift() : args;

	var _buffers = [], length = 0;
	buffers.forEach(function (buffer) {
	    if ( !buffer ) {
		return; 
	    }
	    
	    if ( !Buffer.isBuffer(buffer) ) {
		buffer = new(Buffer)(buffer);
	    }
	    length += buffer.length;
	    _buffers.push(buffer);
	    
	});
	buffers = _buffers;
	
	var concat_buffer = new(Buffer)(length), index = 0;
	buffers.forEach(function(buffer) {
	    buffer.copy(concat_buffer, index);
	    index += buffer.length;

	});
	concat_buffer.limit = limit;
	callback.call(concat_buffer, concat_buffer);

	return concat_buffer;
    };
  

    Buffer.concat = concat;

}());
