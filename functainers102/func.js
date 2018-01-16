// Fn JSON format passes input like the following for each function
// invocation:
//
// {
//   "call_id": "123",
//   "content_type": "application/text",
//   "body": "Tom",
//   "protocol": {
//     "request_url": "http://localhost:8080/r/myapp/myfunc"
//   }
// }
// 
// Output, if all goes well, should look like:
//
// {
//    "body": "Hello Tom",
//    "content_type": "application/text",
//    "protocol": {
//      "status_code": 200
//     }
// }


var JSONStream = require('JSONStream')
  , es = require('event-stream');

function handle(body) {
  return 'Hello ' + body;
}

// Read JSON from standard input looking for the body property
// of the incoming request objects, construct a response, and 
// write that to standard output.
process.stdin
  .pipe(
    // look for root 'body' property
    JSONStream.parse(['body']))
  .pipe(
    es.mapSync(function(body){
      var response = handle(body);
      return {
        'body': response,
        'content_type': 'application/text',
        'protocol': {
          'status_code': 200
          }
        };
    }))
  .pipe(JSONStream.stringify(false))
  .pipe(process.stdout);