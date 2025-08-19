#!/usr/bin/env node

// Import shtuff
import * as fs from 'fs'; // for fs's sake
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import markdownit from 'markdown-it';
import md_footnote from 'markdown-it-footnote';
const md = markdownit({
    html: true
}).use(md_footnote);
import nunjucks from 'nunjucks';
nunjucks.configure({ autoescape:false });

// For each of these files...
// Get the markdown, convert to HTML, render it in template w Nunjucks & export
let convertConfigs = [
    {
        markdown:'test/test.md', template:'templates/test_template.html', exportTo:'test/index.html',
        extras:{
            foo:'there once!',
            bar:'was a man...',
            etc:'from nantucket?'
        }
    },
    {
        markdown:'intro.md', template:'templates/page_template.html', exportTo:'index.html',
        extras:{
            title: '給血肉凡人的 AI 安全課', // '[DRAFT, DO NOT PUBLICLY SHARE]'
            share_desc: '一站式了解 AI 和 AI 安全的所有核心思想！',
            share_image: 'https://aisafety.dance/thumbs/thumb.png',
            root:'',

            isFrontpage: true
        }
    },
    {
        markdown:'p1/p1.md', template:'templates/page_template.html', exportTo:'p1/index.html',
        extras:{
            title: '第一部分：過去、現在與可能的未來',
            share_desc: '第一部分 — 給血肉凡人的 AI 安全課',
            share_image: 'https://aisafety.dance/thumbs/thumb-p1.png',
            root:'../',

            isPartOne: true
        }
    },
    {
        markdown:'p2/p2.md', template:'templates/page_template.html', exportTo:'p2/index.html',
        extras:{
            title: '第二部分：問題',
            share_desc: '第二部分 — 給血肉凡人的 AI 安全課',
            share_image: 'https://aisafety.dance/thumbs/thumb-p2.png',
            root:'../',

            isPartTwo: true
        }
    },
    {
        markdown:'p3/p3.md', template:'templates/page_template.html', exportTo:'p3/index.html',
        extras:{
            title: '第三部分：解決方案',
            share_desc: '第三部分 — 給血肉凡人的 AI 安全課',
            share_image: 'https://aisafety.dance/thumbs/thumb-p3.png',
            root:'../',

            isPartThree: true
        }
    }
];
convertConfigs.forEach((config)=>{
    // Get markdown
    fs.readFile( config.markdown, "utf-8", (err, markdown)=>{
        if(err){ console.log(err); }else{

            // Get template
            fs.readFile( config.template, "utf-8", (err, template)=>{
                if(err){ console.log(err); }else{

                    // Convert MD => HTML
                    let renderedHTML = md.render(markdown);

                    // Render any Nunjucks *inside* the markdown...
                    let data = config.extras || {};
                    renderedHTML = nunjucks.renderString(renderedHTML, data);

                    // Render in template with Nunjucks
                    data.content = renderedHTML;
                    let html = nunjucks.render(config.template, data);

                    // Write out!
                    fs.writeFile( __dirname+'/'+config.exportTo, html, err=>{
                        if(err) console.error(err);
                        else console.log('Built '+config.markdown+'!');
                    });

                }
            });
        }
    });
});
