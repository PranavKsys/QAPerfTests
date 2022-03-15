var fs = require('fs'); //imports the NodeJS File System module (https://www.w3schools.com/nodejs/default.asp)
console.time(); //start timer to measure time taken to run this test script
const puppeteer = require('puppeteer'); //imports the Puppeteer NodeJS library (https://developers.google.com/web/tools/puppeteer)
const fileHandler = require('./fileHandler.js'); //imports the custom fileHandler module
const site = process.argv[2]; //site to test entered as a CLI parameter, reads the 3rd element in the argument array. only accepts http for now

//*** TASK - PranavD: move path creation to fileHandler or a new module ***
//create screenshot path with timestamp:
var domain = site.slice((site.indexOf('.') + 1), (site.indexOf('.com'))); //get the name of the domain being tested
var dateObj = new Date().toISOString(); //get the current date and time
var timestamp = dateObj.substring(0, (dateObj.indexOf('Z') - 4)); //trims the trailing milliseconds and other info thats not required
//create folder path
var dir = `./${domain}_results`; //create the naming convention for the folder 
var folder = fileHandler.createFolder(dir); //create the folder using fileHandler module
folder = folder.toString(); //convert object to string

var scrPath = `${folder}/scr_${domain}_${timestamp}.png`; //creates path for screenshot and names the file using the domain name and timestamp

var url = site.toString(); //convert object to string
fileHandler.addUrl(url); //add URL to text file using fileHandler module
testSite(); //call the function that tests URL given by user

async function testSite() {
    const browser = await puppeteer.launch(); //creates Chrome headless browser
    const page = await browser.newPage(); //creates a browser page - starts up the browser
    console.log('Measuring page performance...');
    const response = await page.goto(url, { //launch URL, wait until there are 0 network connections and all DOM content is loaded
        waitUntil: ['networkidle0', 'domcontentloaded']
    });
    const performanceTiming = JSON.parse(
        await page.evaluate(() => JSON.stringify(window.performance)), //*** TASK - PranavD: convert output to time format readable by humans lol ***
    );
    fileHandler.addTimingResults(domain, performanceTiming, folder);
    await page.screenshot({ path: scrPath, fullpage: true });
    console.log(`Screenshot taken for ${domain}`);
    await browser.close();
    console.timeEnd();
}