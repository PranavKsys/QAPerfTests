//import { launch } from "puppeteer";
console.time();
const puppeteer = require('puppeteer');
const fileHandler = require('./fileHandler.js');
const site = process.argv[2]; // site to test entered as a parameter. only accepts http for now
//create screenshot path with timestamp:
var domain = site.slice((site.indexOf('.') + 1), (site.indexOf('.com')));
var dateObj = new Date().toISOString();
var timestamp = dateObj.substring(0, (dateObj.indexOf('Z') - 4));
var scrPath = `scr_${domain}_${timestamp}.png`;
var url = site.toString();

fileHandler.addUrl(url);

testSite();

async function testSite() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("Test URL found in file: " + url);
    const response = await page.goto(url, {
        waitUntil: ['networkidle0', 'domcontentloaded']
    });
    const performanceTiming = JSON.parse(
        await page.evaluate(() => JSON.stringify(window.performance)),
    );
    fileHandler.addTimingResults(domain, performanceTiming);
    console.log('performanceTiming', performanceTiming);
    await page.screenshot({ path: scrPath, fullpage: true });
    console.log("Test - Screenshot saved");
    await browser.close();
    console.timeEnd();
}