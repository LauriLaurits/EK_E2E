export default class HomePage{
    constructor(page) {
        this.page = page;
    }
    async visit(siteUrl) {
        await this.page.goto(siteUrl, { waitUntil: 'networkidle0'});
        await this.page.waitForSelector(".primary-menu");
        await this.page.waitForSelector("#registration_link");
    }
    async navigation() {
        await this.page.waitForSelector(".primary-menu");
    }
}
