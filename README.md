# file-source

This is a redesign and generalization of my [binary file reader](https://github.com/mbostock/shapefile/blob/master/file.js) in [shapefile](https://github.com/mbostock/shapefile). See also:

* [binary-file](https://github.com/marvinroger/node-binary-file) by [Marvin Roger](https://github.com/marvinroger)
* [binary-reader](https://github.com/gagle/node-binary-reader) by [Gabriel Llamas](https://github.com/gagle)
* [pull-reader](https://github.com/dominictarr/pull-reader) by [Dominic Tarr](https://github.com/dominictarr)

This is an experiment.

## Usage

```js
var file = require("file-source");

file.open("foo.dat")
    .then(function(foo) { console.log("open"); return foo.read(32); })
    .then(function(foo) { console.log(foo.value); return foo.read(64); })
    .then(function(foo) { console.log(foo.value); return foo.close(); })
    .then(function() { console.log("closed"); })
    .catch(function(error) { console.log(error); });
```
