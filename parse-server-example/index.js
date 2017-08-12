var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
const bodyParser = require('body-parser');

const admin = require('./routes/admin');

var api = new ParseServer({
  databaseURI: 'postgres://postgres:postgres@localhost:5432/blog',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey', 
  restAPIKey: 'myRestApiKey',
  javascriptKey: 'myJavascriptKey',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/api/v1', 
  liveQuery: {
    classNames: ["Posts", "Comments"] 
  }
});
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mountPath = process.env.PARSE_MOUNT || '/api/v1';
app.use(mountPath, api);

app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

app.use((req, res, next) => {
  const Parse = require('parse/node');
  Parse.initialize('myAppId', 'myJavascriptKey', 'myMasterKey');
  Parse.serverURL = 'http://localhost:1337/api/v1';
  next();
});

app.use('/admin', admin);

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

ParseServer.createLiveQueryServer(httpServer);
