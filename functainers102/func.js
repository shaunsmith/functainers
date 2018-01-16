// Fn JSON format passes input like the following for each function
// invocation:
//
// {
//   'call_id': '123',
//   'content_type': 'application/json',
//   'body': '{"name" : "Tom"}',
//   'protocol': {
//     'request_url': 'http://localhost:8080/r/myapp/myfunc'
//   }
// }
// 
// Output, if all goes well, should look like:
//
// {
//   'body': '{"greeting": "Hello Tom"}',
//   'content_type': 'application/json',
//   'protocol': {
//     'status_code': 200
//     }
// }



var JSONStream = require('JSONStream')
  , es = require('event-stream')

// Read JSON from standard input looking for the body property
// of the incoming request objects, construct a response, and 
// write that to standard output.
process.stdin
  .pipe(
    // look for root 'body' property
    JSONStream.parse(['body']))
  .pipe(
    es.mapSync(function(body){
      // body should be an object with a single 'name' property
      // like: {"name": "Tom"}
      var message = 'Hello ' + body.name;
      return JSON.stringify({
        'body': {greeting: message},
        'content_type': 'application/json',
        'protocol': {
          'status_code': 200
          }
        });
    }))
  .pipe(process.stdout);