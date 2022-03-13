var fs = require('fs');
const { Module } = require('module');
const readline = require('readline');
var fileName = 'testUrls.txt'; // store initial site URL and store sub page URLs from the crawler
var resultFile;

// add initial url and thereafter sub page urls to text file

async function addUrl(site) {
    fs.writeFile(fileName, site + "\r\n", { flag: 'a+' }, function(err) {
        if (err) throw err;
        console.log(fileName + ' created!');
    });
}

//get all sub page urls from text file
async function getUrl() {
    const fileStream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
        terminal: false
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // Each line will be successively available here as `line`.
    for await (const line of rl) {
        testSite(line);
        console.log(line[rl]); // prints out each URL from the array
    }
}

async function addTimingResults(domain, performanceTiming) {
    resultFile = domain + '_timings.json';
    perfTime = JSON.stringify(performanceTiming);
    fs.writeFile(resultFile, perfTime + "\r\n", { flag: 'a+' }, function(err) {
        if (err) throw err;
        console.log('Page timing saved to ' + resultFile);
    });
}
//check when the end of the text file has been reached
function getEof() {
    const readline = require('readline');
    var linesCount = 0;
    var rl = readline.createInterface({
        input: fs.createReadStream(fileName),
        output: process.stdout,
        terminal: false
    });
    rl.on('line', function(line) {
        linesCount++; // on each linebreak, add +1 to 'linesCount'
    });
    rl.on('close', function() {
        console.log(linesCount); // print the result when the 'close' event is called
    });
    return linesCount;
}
module.exports = { addUrl, getUrl, getEof, addTimingResults }; //this .js file is a module which exports the function addUrl which can be called in another module (.js file)