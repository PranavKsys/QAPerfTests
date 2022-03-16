const puppeteer = require('puppeteer'); //imports the Puppeteer NodeJS library (https://developers.google.com/web/tools/puppeteer)
const site = process.argv[2]; //site to test entered as a CLI parameter, reads the 3rd element in the argument array. only accepts http for now
const url = site.toString(); //convert object to string

let testThis = async() => {
    const browser = await puppeteer.launch(); //open Chrome browser in headless state
    const page = await browser.newPage(); //creates a browser page - starts up the browser
    await page.goto(url, {
        waituntil: ['networkidle0', 'domcontentloaded']
    });
    await page.screenshot({ path: 'testThis.png', fullpage: true });
    const [response] = await Promise.all([
        await page.waitForNavigation(),
        await page.click('a.https://www.bmogam.com/press-office/'),
        console.log(response),
    ]);
    await browser.close();
}
testThis();