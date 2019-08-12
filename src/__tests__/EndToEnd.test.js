import jest from 'jest';
import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    
    let browser;
    let page;
    beforeAll( async () => {
        browser = await puppeteer.launch({
         /*   headless: false,
            slowMo: 100
            */
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
        await page.waitForSelector('.Event');
    });

    afterAll( () => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const extra = await page.$('.Event .show_details');
        expect(extra).toBeNull();
    });

    test('User can expand an event to see its details', async() => {
        await page.click('.Event .details-button');
        const extra = await page.$('.Event .show_details');
        expect(extra).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.Event .details-button'); // following previous test where expanded
        const extra = await page.$('.Event .show_details');
        expect(extra).toBeNull();
    });
});
/*
describe('filter events by city', () => {

    let browser;
    let page;
    beforeAll( async () => {
        browser = await puppeteer.launch({
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
    });

    afterAll( () => {
        browser.close();
    });

    test('by default, when user hasn’t searched for a city, show upcoming events based on the user’s location', async () => {
        const event = await page.waitForSelector('.Event');
        expect(event).toBeDefined();
    });

    test('user should see a list of suggestions when they search for a city', async ()  => {
        await page.waitForSelector('.CitySearch .city');
        await page.type('.city', 'Munich');
        const suggestions = await page.$('.suggestions li');
        expect(suggestions).toHaveLength(2);
    });

    test('User can select a city from the suggested list', async () => {
        await page.waitForSelector('.CitySearch .city');
        await page.type('.city', 'Munich');
       // const suggestions = await page.$('.suggestions li');
        await page.click('.suggestions li');
        const city = await page.$('.city');
        expect(city).toBe('Munich, Germany');
    })
});
*/