// content of index.js
const http = require('http');
var sys = require('sys')
var execSync = require('child_process').execSync;

const port = 39000;

function puts(error, stdout, stderr) { console.log(stdout); }

const requestHandler = (request, response) => {
    var url = require('url');
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    var data = '';
    try {
        if (query.title) { // create branch
            var branchName = query.id + '-' + query.title.toLowerCase().match(/([a-zA-Z1-9]+)/g).join('_');
            console.log(new Date().toLocaleTimeString() + " " + 'Received request for: ' + branchName);
            var data = execSync("hg --cwd ~/Code/insights/ shelve -A; hg --cwd ~/Code/insights/ update master; hg --cwd ~/Code/insights/ pull; hg --cwd ~/Code/insights/ branch " + branchName).toString();
            console.log(new Date().toLocaleTimeString() + " " + branchName + " was probably created");
        }
        if (query.branch) { // chekout branch
            var branchName = query.branch;
            console.log(new Date().toLocaleTimeString() + " " + 'Received request for: ' + branchName);
            var data = execSync("hg --cwd ~/Code/insights/ shelve -A; hg --cwd ~/Code/insights/ pull; hg --cwd ~/Code/insights/ update " + branchName).toString();
            console.log(new Date().toLocaleTimeString() + " " + branchName + " was probably checked out");
        }
    } catch(e) {
        console.log(e);
    }
    response.end(data);
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
