(function () {
    "use strict";

    /**
     * A naiive 'Buffer.indexOf' function. Requires both the
     * needle and haystack to be Buffer instances.
     */
    var _indexOf = function(buffer, pattern, index) {
	var length, good;

	if ( !Buffer.isBuffer(pattern) )  pattern = new(Buffer)(pattern);
	if ( typeof index == 'undefined' ) index = 0;

	var length = buffer.length - pattern.length;
	while ( index <= length ) {
	    good = true;
	    
	    for ( var j = 0; j < pattern.length; j++ ) {
		if ( buffer[i+j ] !== pattern[j] ) {
		    good = false;
		    break;
		}
	    }
	    
	    if ( good ) return i;
	    i++;
	}
	
	return -1;

    };


    Buffer.indexOf = indexOf;
    Buffer.prototype.indexOf = function(needle, i) {
	return Buffer.indexOf(this, needle, i);
    }

})();
