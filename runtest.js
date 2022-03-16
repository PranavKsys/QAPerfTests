const fs = require('fs'); //imports the NodeJS File System module (https://www.w3schools.com/nodejs/default.asp)
const puppeteer = require('puppeteer'); //imports the Puppeteer NodeJS library (https://developers.google.com/web/tools/puppeteer)
const site = process.argv[2]; //site to test entered as a CLI parameter, reads the 3rd element in the argument array. only accepts http for now
const url = site.toString(); //convert object to string

testSite(); //call the function that tests URL given by user

async function testSite() {
    const browser = await puppeteer.launch(); //open Chrome browser in headless state
    const page = await browser.newPage(); //creates a browser page - starts up the browser

    console.log('Measuring page performance...');
    const response = await page.goto(url, { //launch URL, wait until there are 0 network connections and all DOM content is loaded
        waitUntil: ['networkidle0', 'domcontentloaded']
    });
    const performanceTimingJson = JSON.stringify(window.performance);
    const performanceTiming = JSON.parse(performanceTimingJson);
    const resourceListEntries = performance.getEntriesByType("href");
    console.log(resourceListEntries);
    console.log(performanceTiming);
    const startToInteractive = (performanceTiming.timing.domInteractive - performanceTiming.timing.navigationStart) / 1000;
    console.log(`Navigation start to DOM interactive: ${startToInteractive}s`);
    await browser.close(); //wait for browser to close
}