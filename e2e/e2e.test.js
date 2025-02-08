import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("test check", () => {
    let browser = null;
    let page = null;
    let server = null;
    const baseUrl = "http://localhost:8088";

    beforeAll(async () => {
        server = fork(`${__dirname}/e2e.server.js`);
        await new Promise((resolve, reject) => {
            if (server.connected) {
                process.send("ok");
                resolve();
            } else {
                reject();
            }
        });
        browser = await puppeteer.launch()
        // browser = await puppeteer.launch({
        //     //   headless: false,
        //         // headless: 'new',
        //         // slowMo: 200,
        //     //   devtools: false,
        // });

        page = await browser.newPage();
    });

    afterAll(async () => {
        // await page.close()
        await browser.close()
        await server.kill();
    });

    test("тест на первый клик, елемент есть на странице", async () => {
        await page.goto(baseUrl);
        const input = await page.$("input");
        await input.click();
        expect(await page.$eval(".counter", (elem) => elem.textContent)).toBe("1");
    });
});
