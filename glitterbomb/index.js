let express = require('express');
let path = require('path');
let app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
  response.redirect('/glitterbomb')
});

app.get('/glitterbomb', function(request, response) {
  response.sendFile(__dirname + '/public/glitterbomb.html')
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});