const { expect } = require('chai');
const MarkdownIt = require('markdown-it');
const MarkdownItKroki = require('../../index');
const { JSDOM } = require('jsdom');

const testData = [
    // graphviz
    {
        langname: 'graphviz',
        data: '```graphviz svg\r\n' +
            'digraph G {Hello->World}\r\n' +
            '```\r\n'
    }
];

describe('# [total test] Test pulugin can Render DOM', () => {
    for (const test of testData) {
        describe(`## Test for ${test.langname}`, () => {
            describe('### no option call test', () => {
                it('* Not to Throw on no options', () => {
                    const testFunction = () => {
                        // render !
                        const md = new MarkdownIt();
                        md.use(MarkdownItKroki);
                        const _ = md.render(test.data);
                    };
                    expect(testFunction).to.not.throw();
                });
                it('* root DOM item is \'p\' on no option', () => {
                    // render !
                    const md = new MarkdownIt();
                    md.use(MarkdownItKroki);
                    const result = md.render(test.data);

                    // find p-tag
                    const dom = new JSDOM(result);
                    const document = dom.window.document;
                    const ptags = document.getElementsByTagName("p");

                    // test p-tag is only one
                    expect(ptags.length).to.be.equal(1);

                    // test root item is p
                    const thePtag = ptags[0];
                    expect(thePtag.isSameNode(document.body.firstChild)).to.true;

                    // test embeded default container class
                    expect(thePtag.getAttribute('class')).to.be.equal('kroki-image-container');
                });
                it('* has img tag and source is created by this library.', () => {
                    // render !
                    const md = new MarkdownIt();
                    md.use(MarkdownItKroki);
                    const result = md.render(test.data);

                    // find p-tag
                    const dom = new JSDOM(result);
                    const document = dom.window.document;
                    const imgTags = document.getElementsByTagName("embed");

                    // test img-tag is only one
                    expect(imgTags.length).to.be.equal(1);

                    const imgTag = imgTags[0];
                    expect(imgTag.getAttribute('src')).not.to.empty;
                })
            });
        })
    }
})
describe('[total test] Can Render', () => {
    it('* option constainerClass is embeded.', () => {
        const md = new MarkdownIt();

        md.use(MarkdownItKroki, {
            entrypoint: "https://kroki.io",
            marpAutoScaling: true,
            containerClass: "the-container"
        });

        var result = md.render(
            '```graphviz [praphviz-image]\r\n' +
            'digraph G {Hello->World}\r\n' +
            '```\r\n'
        );
        const dom = new JSDOM(result);
        const document = dom.window.document;
        const ptags = document.getElementsByTagName("p");

        expect(ptags.length).to.be.equal(1);
        const thePtag = ptags[0];

        expect(thePtag.isSameNode(document.body.firstChild)).to.true;
        expect(thePtag.getAttribute('class')).to.be.equal('the-container');
    });
});