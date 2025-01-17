const md = require('markdown-it');
const expect = require('chai').expect;
const { JSDOM } = require('jsdom');
const { MarkdownItKrokiCore } = require('../../lib/plugin-core');

describe('# [unit-test] plugin-core.js', () => {
    describe('## method: setOptions() must be work', () => {
        function buildHtmlForTest(options) {
            const test = 'plantuml';

            const diagramCode = '@startuml\nBob -> Alice : hello\n @enduml';

            // build embed HTML
            const plugin = new MarkdownItKrokiCore(new md()).setOptions(options);
            plugin.use();
            return plugin.buildEmbedHTML({ language: test }, diagramCode);
        }
        describe('### entrypoint', () => {
            function expectEntryPointToEmbed(htmlString, expected) {
                if (!expected) expected = 'https://kroki.io';
                // parse dom
                const dom = new JSDOM(htmlString);
                const imgTag = dom.window.document.getElementsByTagName("embed")[0];

                // get url attribute
                const url = imgTag.getAttribute('src');

                expect(url.startsWith(expected)).to.true;
            }
            it('* no options', () => {
                const html = buildHtmlForTest();
                expectEntryPointToEmbed(html);
            });
            it('* option is null', () => {
                const html = buildHtmlForTest({ entrypoint: null });
                expectEntryPointToEmbed(html);
            });
            it('* option is undefined', () => {
                const html = buildHtmlForTest({ entrypoint: undefined });
                expectEntryPointToEmbed(html);
            });
            it('* option is \'\'', () => {
                const html = buildHtmlForTest({ entrypoint: '' });
                expectEntryPointToEmbed(html);
            });
            it('* option is 1', () => {
                const html = buildHtmlForTest({ entrypoint: 1 });
                expectEntryPointToEmbed(html);
            });
            it('* option is true', () => {
                const html = buildHtmlForTest({ entrypoint: true });
                expectEntryPointToEmbed(html);
            });
            it('* option is \'https://localhost:8080\'', () => {
                const html = buildHtmlForTest({
                    entrypoint: 'https://localhost:8080'
                });
                expectEntryPointToEmbed(html, 'https://localhost:8080');
            });
        });
        describe.skip('### marpAutoScaling', () => {
            function expectMarpAutoScalingToEmbed(htmlString, expected) {
                // parse dom
                const dom = new JSDOM(htmlString);
                const tags = dom.window.document.getElementsByTagName("marp-auto-scaling");
                if (expected) {
                    expect(tags).not.to.empty;
                } else {
                    expect(tags).to.empty;
                }

            }
            it('* no options', () => {
                const html = buildHtmlForTest();
                expectMarpAutoScalingToEmbed(html, true);
            });
            it('* option is null', () => {
                const html = buildHtmlForTest({ marpAutoScaling: null });
                expectMarpAutoScalingToEmbed(html, true);
            });
            it('* option is undefined', () => {
                const html = buildHtmlForTest({ marpAutoScaling: undefined });
                expectMarpAutoScalingToEmbed(html, true);
            });
            it('* option is \'\'', () => {
                const html = buildHtmlForTest({ marpAutoScaling: '' });
                expectMarpAutoScalingToEmbed(html, true);
            });
            it('* option is 1', () => {
                const html = buildHtmlForTest({ marpAutoScaling: 1 });
                expectMarpAutoScalingToEmbed(html, true);
            });
            it('* option is \'test\'', () => {
                const html = buildHtmlForTest({ marpAutoScaling: 'test' });
                expectMarpAutoScalingToEmbed(html, true);
            });
            it('* option is false', () => {
                const html = buildHtmlForTest({ marpAutoScaling: false });
                expectMarpAutoScalingToEmbed(html, false);
            });
        })
        describe('### containerClass', () => {
            function expectContainerClassToEmbed(htmlString, className) {
                // parse dom
                const dom = new JSDOM(htmlString);
                const pTag = dom.window.document.getElementsByTagName("p")[0];

                const actualClassName = pTag.getAttribute('class');
                expect(actualClassName).to.equal(className);
            }
            it('* no options', () => {
                const html = buildHtmlForTest();
                expectContainerClassToEmbed(html, 'kroki-image-container');
            });
            it('* option is null', () => {
                const html = buildHtmlForTest({ containerClass: null });
                expectContainerClassToEmbed(html, 'kroki-image-container');
            });
            it('* option is undefined', () => {
                const html = buildHtmlForTest({ containerClass: undefined });
                expectContainerClassToEmbed(html, 'kroki-image-container');
            });
            it('* option is \'\'', () => {
                const html = buildHtmlForTest({ containerClass: '' });
                expectContainerClassToEmbed(html, 'kroki-image-container');
            });
            it('* option is 1', () => {
                const html = buildHtmlForTest({ containerClass: 1 });
                expectContainerClassToEmbed(html, 'kroki-image-container');
            });
            it('* option is \'containerClass\'', () => {
                const html = buildHtmlForTest({ containerClass: 'containerClass' });
                expectContainerClassToEmbed(html, 'containerClass');
            });
        });
        describe('### imageFormat', () => {
            function expectImageFormatToEmbed(htmlString, expected) {
                // parse dom
                const dom = new JSDOM(htmlString);
                const imgTag = dom.window.document.getElementsByTagName("embed")[0];

                // get url attribute
                const url = imgTag.getAttribute('src');

                expect(url).to.includes('/' + expected + '/');
            }
            it('* no options', () => {
                const html = buildHtmlForTest();
                expectImageFormatToEmbed(html, 'svg');
            });
            it('* option is null', () => {
                const html = buildHtmlForTest({ imageFormat: null });
                expectImageFormatToEmbed(html, 'svg');
            });
            it('* option is undefined', () => {
                const html = buildHtmlForTest({ imageFormat: undefined });
                expectImageFormatToEmbed(html, 'svg');
            });
            it('* option is \'\'', () => {
                const html = buildHtmlForTest({ imageFormat: '' });
                expectImageFormatToEmbed(html, 'svg');
            });
            it('* option is 1', () => {
                const html = buildHtmlForTest({ imageFormat: 1 });
                expectImageFormatToEmbed(html, 'svg');

            });
            it('* option is \'test\'', () => {
                const html = buildHtmlForTest({ imageFormat: 'test' });
                expectImageFormatToEmbed(html, 'svg');
            });
            it('* option is \'png\'', () => {
                const html = buildHtmlForTest({ imageFormat: 'png' });
                expectImageFormatToEmbed(html, 'png');
            });
        });
    });
});