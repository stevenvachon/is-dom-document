"use strict";
const {after, before, it} = require("mocha");
const puppeteer = require("puppeteer");
const puppeteerCoverage = require("puppeteer-to-istanbul");

const runInBrowser = func => () => page.evaluate(func);

let browser, page;



// @todo also use npmjs.com/puppeteer-firefox
before(async () =>
{
	browser = await puppeteer.launch({ args: ["--no-sandbox"] });
	page = await browser.newPage();

	page.on("console", async msg => console[msg._type](...await Promise.all(msg.args().map(arg => arg.jsonValue()))));
	page.on("pageerror", console.error);

	await Promise.all(
	[
		page.addScriptTag({ path: "node_modules/chai/chai.js" }),
		page.addScriptTag({ path: "temp.js" }),

		// @todo https://github.com/istanbuljs/puppeteer-to-istanbul/issues/18
		// @todo https://github.com/GoogleChrome/puppeteer/issues/3570
		page.coverage.startJSCoverage({ reportAnonymousScripts: true })
	]);

	await page.evaluate(() =>
	{
		const iframe = document.createElement("iframe");
		document.body.append(iframe);
		window.anotherRealm = iframe.contentWindow;

		window.expect = chai.expect;
		delete window.chai; // cleanup
	});
});



after(async () =>
{
	let coverage = await page.coverage.stopJSCoverage();

	// Exclude tools
	coverage = coverage.filter(({url}) => !url.includes("chai"));

	puppeteerCoverage.write(coverage);

	browser.close();
});



it("is a (bundled) function", runInBrowser(() =>
{
	expect(window.isDOMDocument).to.be.a("function");
}));



it("returns true for a Document", runInBrowser(() =>
{
	const args =
	[
		document,
		document.implementation.createDocument("namespaceURI", "qualifiedNameStr"),
		document.implementation.createHTMLDocument("title"),
		anotherRealm.document
	];

	args.forEach(arg => expect(isDOMDocument(arg)).to.be.true);
}));



it("returns false for a non-Document", runInBrowser(() =>
{
	const args =
	[
		"Document",
		Symbol("Document"),
		{},
		[],
		/regex/,
		true,
		1,
		null,
		undefined,

		document.createComment("data"),
		document.createDocumentFragment(),
		document.createElement("tagName"),
		document.createProcessingInstruction("target", "data"),
		document.createTextNode("data"),
		document.implementation.createDocument("namespaceURI", "qualifiedNameStr").createCDATASection("data"),
		document.implementation.createDocumentType("qualifiedNameStr", "publicId", "systemId"),
		window,
		anotherRealm
	];

	args.forEach(arg => expect(isDOMDocument(arg)).to.be.false);
}));
