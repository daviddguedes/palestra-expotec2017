Parse.Cloud.define('hello', function (req, res) {
	res.success('Hi');
});

Parse.Cloud.define("updateUser", function (request, response) {
	// const Parse = require('parse/node');
	// Parse.initialize('myAppId', 'myJavascriptKey', 'myMasterKey');
	// Parse.serverURL = 'http://localhost:1337/api/v1';

	// let tokemRequest = request.headers['x-parse-session-token'];

	// let query = new Parse.Query(Parse.User);
	// query.equalTo('objectId', request.params.objectId);
	// query.first().then( (user) => {
	// 	if (user) {
	// 		user.save(request.params, { useMasterKey: true }, {
	// 			success: function(x) {
	// 				console.log(x);
	// 				response.success(JSON.stringify(x));
	// 			}, error: function(e) {
	// 				response.error(JSON.stringify(e));
	// 			}
	// 		});
	// 	}
	// });
});