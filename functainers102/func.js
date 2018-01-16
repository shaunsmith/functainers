// Fn JSON format passes input like the following for each function
// invocation:
//
// {
//   'call_id': '123',
//   'content_type': 'application/json',
//   'body': '{"name" : "Tom"}',
//   'protocol': {
//     'type': 'http',
//     'request_url': 'http://localhost:8080/r/myapp/myfunc',
//     'headers': {
//       'Content-Type': ['application/json'],
//       'Other-Header': ['something']
//     }
//   }
// }
// 
// Output, if all goes well, should look like:
//
// {
// 	'body': '{"greeting": "Hello Tom"}',
// 	'content_type': 'application/json',
// 	'protocol': {
// 		'status_code': 200
// 		}
// }


var JSONStream = require('JSONStream')
	, es = require('event-stream')

process.stdin
	.pipe(
		// look for root 'body' property
		JSONStream.parse(['body']))
	.pipe(
		// body should be simple JSON object with a single 'name' property
		// like: {"name": "Tom"}
		es.mapSync(function(node){
			var body = JSON.parse(node);
			var response = JSON.stringify({
				'body': {greeting: 'Hello ' + body.name},
				'content_type': 'application/json',
				'protocol': {
					'status_code': 200
					}
				});
			console.log(response);
	}))