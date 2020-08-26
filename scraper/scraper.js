const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://www.ebay.co.uk/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=synthesizers&_sacat=0&LH_TitleDesc=0&_osacat=0&_odkw=synthesizer'

    await page.goto(url);

    const titles = await page.evaluate(() => Array.from(document.querySelectorAll('h3.s-item__title')).map((p) => p.innerText));
    const image = await page.evaluate(() => Array.from(document.querySelectorAll('div.s-item__image div.s-item__image-wrapper img')).map((logo) => logo.src));

    console.log(titles);
    console.log(image);

    await browser.close();
})();



