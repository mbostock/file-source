# file-source

This is a redesign and generalization of my [binary file reader](https://github.com/mbostock/shapefile/blob/master/file.js) in [shapefile](https://github.com/mbostock/shapefile). It is a bit like Gabriel Llamas’ [binary-reader](https://github.com/gagle/node-binary-reader), Dominic Tarr’s [pull-reader](https://github.com/dominictarr/pull-reader) and Marvin Roger’s [binary-file](https://github.com/marvinroger/node-binary-file). This is an experiment.

## Usage

```js
var foo = file.source("foo.dat");

foo.open();

foo.read(32, function(error, buffer) {
  if (error) throw error;
  console.log("first 32 bytes", buffer);
});

foo.read(64, function(error, buffer) {
  if (error) throw error;
  console.log("next 64 bytes", buffer);
});

foo.close();
```

Or, with method chaining:

```js
file.open("foo.dat")
    .read(32, function(error, buffer) {
      if (error) throw error;
      console.log("first 32 bytes", buffer);
    })
    .read(64, function(error, buffer) {
      if (error) throw error;
      console.log("next 64 bytes", buffer);
    })
    .close();
```

Or, with nesting:

```js
var foo = file.source("foo.dat");

foo.open(function(error) {
  if (error) throw error;
  foo.read(32, function(error, buffer) {
    if (error) throw error;
    console.log("first 32 bytes", buffer);
    foo.read(64, function(error, buffer) {
      if (error) throw error;
      console.log("next 64 bytes", buffer);
      foo.close(function(error) {
        if (error) throw error;
      });
    });
  });
});
```

## Discussion

If an error occurs, all queued tasks receive the same error. That seems reasonable, since otherwise it’s like those asynchronous tasks run forever. But maybe there should be a special secondary error for queued tasks that never ran. Alternatively, there could be an error listener (like binary-file-reader), but then the callbacks shouldn’t receive errors, and then it’s harder for the error listener to know what state it’s in when an error is caught. Alternatively, this should be promise-y, like binary-file.
