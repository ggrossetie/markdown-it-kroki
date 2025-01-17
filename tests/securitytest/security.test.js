const MarkdownIt = require('markdown-it');
const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const MarkdownItKroki = require('../../index');

describe('# [Security-test] anti-injecttion for syntax.', () => {
    describe("## for alt", () => {
        it('* escape double quote', () => {
            const expected = 'this is a "test comment" test';

            const md = new MarkdownIt();
            md.use(MarkdownItKroki, {
                entrypoint: "https://kroki.io",
                marpAutoScaling: true,
                containerClass: "the-container"
            });

            const result = md.render(
                '```graphviz [this is a "test comment" test]\r\n' +
                'digraph G {Hello->World}\r\n' +
                '```\r\n'
            );
            const dom = new JSDOM(result);
            const imgTag = dom.window.document.getElementsByTagName("embed")[0];
            const actual = imgTag.getAttribute('title');

            expect(actual).to.be.equal(expected);
        })
    })
});
describe('# [Security-test] anti-injecttion for option.', () => {
    describe("## for entrypoint", () => {
        it('* deny invalid URL', () => {
            const md = new MarkdownIt();
            md.use(MarkdownItKroki, {
                entrypoint: "https://kroki.io\"> <script src=\"xxxx.js",
                marpAutoScaling: true,
                containerClass: "the-container"
            });

            const html = md.render(
                '```graphviz [this is a test]\r\n' +
                'digraph G {Hello->World}\r\n' +
                '```\r\n'
            );
            const dom = new JSDOM(html);
            const scriptTag = dom.window.document.getElementsByTagName("script");
            expect(scriptTag.length).to.equal(0);
        })
    })
    describe("## for containerClass", () => {

        it('* throw when containerClass are not alpha, digit, or \"-\"', () => {
            const testFunction = () => {
                const md = new MarkdownIt();
                md.use(MarkdownItKroki, {
                    entrypoint: "https://kroki.io",
                    marpAutoScaling: true,
                    containerClass: "<container>"
                });

                const result = md.render(
                    '```graphviz [this is a test]\r\n' +
                    'digraph G {Hello->World}\r\n' +
                    '```\r\n'
                );
            };
            expect(testFunction).to.throw();

        })
    })
    describe("## for imageFormat", () => {
        it('* ignore invalid imageFormat', () => {
            const md = new MarkdownIt();
            md.use(MarkdownItKroki, {
                entrypoint: "https://kroki.io",
                marpAutoScaling: true,
                containerClass: "the-container",
                imageFormat: "<injected>"
            });

            const html = md.render(
                '```graphviz [this is a test]\r\n' +
                'digraph G {Hello->World}\r\n' +
                '```\r\n'
            );
            const dom = new JSDOM(html);
            const imgTag = dom.window.document.getElementsByTagName("embed")[0];
            const actual = imgTag.getAttribute('src');

            expect(actual).to.includes('/svg/');
        })
    })
});