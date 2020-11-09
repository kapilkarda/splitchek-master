/**
 * Read query parameter variable
 * @param {String} variable Key of the query parameter to read
 * @return mixed
 */
export let param = (variable) =>  {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split('=');
          if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

/**
 * Creates query parameter
 * @param {Object} obj Object to be encoded
 */
export let buildQuery = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

/**
* See: https://gist.github.com/1847816
* Parse a URI, returning an object similar to Location
* Usage: var uri = parse("hello?search#hash")
* @param {String} url
*/
export let parse = (url) => {
  var result = {};

  var anchor = document.createElement('a');
  anchor.href = url;

  var keys = 'protocol hostname host pathname port search hash href'.split(' ');
  for (var keyIndex in keys) {
    var currentKey = keys[keyIndex];
    result[currentKey] = anchor[currentKey];
  }

  result.toString = function() { return anchor.href; };
  result.requestUri = result.pathname + result.search;
  return result;
}
