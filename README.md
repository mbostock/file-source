# file-source

This is a redesign and generalization of my [binary file reader](https://github.com/mbostock/shapefile/blob/master/file.js) in [shapefile](https://github.com/mbostock/shapefile). See also:

* [binary-file](https://github.com/marvinroger/node-binary-file) by [Marvin Roger](https://github.com/marvinroger)
* [binary-reader](https://github.com/gagle/node-binary-reader) by [Gabriel Llamas](https://github.com/gagle)
* [pull-reader](https://github.com/dominictarr/pull-reader) by [Dominic Tarr](https://github.com/dominictarr)

This is an experiment.

## Usage

```js
var file = require("file-source");

file.open("test/hello.txt").then(function(hello) {
  console.log("opened");
  hello.read(5)
      .then(function(buffer) { console.log(buffer.toString()); return hello.read(2); })
      .then(function(buffer) { return hello.read(5); })
      .then(function(buffer) { console.log(buffer.toString()); return hello.close(); })
      .catch(function(error) { return hello.close(); })
      .then(function() { console.log("closed"); });
});
```
