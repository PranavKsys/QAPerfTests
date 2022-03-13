/*const puppeteer = require('puppeteer');
const fileHandler = require('./fileHandler.js');
const { Module } = require('module');
const urlToTime = process.argv[2];

//fileHandler.addUrl(urlToTime);

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlToTime);
    const performanceTiming = JSON.parse(
        await page.evaluate(() => JSON.stringify(window.performance)),
    );
    console.log('performanceTiming', performanceTiming);
    await browser.close();
})(); */