#!/usr/bin/env node

const Imap = require('imap');
const { simpleParser } = require('mailparser');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

function getCoverImageUrlsInSection(html, startIdx, endIdx) {
  const sectionHtml = html.substring(startIdx, endIdx);
  const urls = [];
  const regex = /src="(https:\/\/readwise-assets[^"]*cover_image[^"]*)"/gi;
  let match;
  while ((match = regex.exec(sectionHtml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function extractArticles(text, html) {
  const sectionMarkers = [
    { name: 'article', pattern: 'h-article', text: 'Articles of the Week' },
    { name: 'twitter', pattern: 'h-twitter', text: 'Tweet of the Week' },
    { name: 'pdf', pattern: 'h-pdf', text: 'PDF of the Week' },
    { name: 'book', pattern: 'h-book', text: 'Book of the Week' },
    { name: 'video', pattern: 'h-video', text: 'Video of the Week' },
    { name: 'feed', pattern: 'h-rss', text: 'Feed of the Week' }
  ];
  
  const sectionPositions = [];
  for (const marker of sectionMarkers) {
    const idx = html.indexOf(marker.pattern);
    sectionPositions.push({ ...marker, htmlIdx: idx });
  }
  
  sectionPositions.sort((a, b) => a.htmlIdx - b.htmlIdx);
  
  const categoryImgMap = {};
  for (let i = 0; i < sectionPositions.length; i++) {
    const section = sectionPositions[i];
    if (section.htmlIdx === -1) continue;
    
    const nextIdx = (i < sectionPositions.length - 1) ? sectionPositions[i + 1].htmlIdx : html.length;
    const urls = getCoverImageUrlsInSection(html, section.htmlIdx, nextIdx);
    categoryImgMap[section.text] = urls;
  }
  
  console.log('Category images:', JSON.stringify(categoryImgMap, null, 2));
  
  const result = [];
  
  const textSectionNames = [
    'Articles of the Week',
    'Tweet of the Week',
    'PDF of the Week',
    'Book of the Week',
    'Video of the Week',
    'Feed of the Week'
  ];
  const textCategoryMap = {
    'Articles of the Week': 'article',
    'Tweet of the Week': 'twitter',
    'PDF of the Week': 'pdf',
    'Book of the Week': 'book',
    'Video of the Week': 'video',
    'Feed of the Week': 'feed'
  };
  
  for (let i = 0; i < textSectionNames.length; i++) {
    const sectionName = textSectionNames[i];
    
    let sectionStart = text.indexOf('## ' + sectionName);
    if (sectionStart === -1) continue;
    
    let sectionEnd;
    if (i < textSectionNames.length - 1) {
      sectionEnd = text.indexOf('## ' + textSectionNames[i + 1]);
    } else {
      sectionEnd = text.indexOf('\n\nUnsubscribe');
    }
    if (sectionEnd === -1) sectionEnd = text.length;
    
    const sectionText = text.substring(sectionStart, sectionEnd);
    const articleBlocks = sectionText.split('\n### ').slice(1);
    
    const subArticles = [];
    const sectionImgUrls = categoryImgMap[sectionName] || [];
    
    for (let j = 0; j < articleBlocks.length; j++) {
      const block = articleBlocks[j];
      const lines = block.split('\n');
      const title = lines[0].trim();
      if (!title) continue;
      
      let url = '';
      for (const line of lines) {
        if (line.includes('https://')) {
          const urlMatch = line.match(/(https:\/\/[^\s]+)/);
          if (urlMatch && !url) url = urlMatch[1];
        }
      }
      
      const summaryLines = [];
      for (let k = 1; k < lines.length; k++) {
        const line = lines[k].trim();
        if (line && !line.startsWith('https://')) {
          summaryLines.push(line);
        }
      }
      const summary = summaryLines.join(' ');
      
      const authorMatch = block.match(/·\s*([^·\n]+)\s*·\s*(\d+\s*minutes?)/i);
      const author = authorMatch ? authorMatch[1].trim() : '';
      
      const img = sectionImgUrls[j] || '';
      
      if (url) {
        subArticles.push({
          title,
          url,
          img,
          summary,
          author: author || undefined
        });
      }
    }
    
    if (subArticles.length > 0) {
      result.push({
        category: textCategoryMap[sectionName],
        subArticles
      });
    }
  }
  
  return result;
}

async function run() {
  const args = process.argv.slice(2);
  const volNum = args[0] || '6';
  const emailSubject = args[1] || 'Wisereads Vol. 132';
  
  const imap = new Imap({
    user: process.env.IMAP_USER,
    password: process.env.IMAP_PASS,
    host: process.env.IMAP_HOST,
    port: parseInt(process.env.IMAP_PORT),
    tls: process.env.IMAP_TLS === 'true',
    tlsOptions: { rejectUnauthorized: process.env.IMAP_REJECT_UNAUTHORIZED !== 'false' }
  });
  
  return new Promise((resolve, reject) => {
    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err, box) => {
        if (err) { reject(err); return; }
        
        imap.search([['SUBJECT', emailSubject]], (err, results) => {
          if (err) { reject(err); return; }
          if (results.length === 0) {
            console.log('No emails found');
            imap.end();
            resolve(null);
            return;
          }
          
          const f = imap.fetch(results[0], { bodies: [''] });
          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, (err, parsed) => {
                if (err) { reject(err); return; }
                
                const text = parsed.text || '';
                const html = parsed.html || '';
                
                const articles = extractArticles(text, html);
                
                const outputPath = path.resolve(__dirname, `../../../readwise-weekly/generated/${volNum}.json`);
                const dir = path.dirname(outputPath);
                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
                }
                
                fs.writeFileSync(outputPath, JSON.stringify({ articles }, null, 2));
                console.log(`Saved to ${outputPath}`);
                console.log(JSON.stringify({ articles }, null, 2));
                
                imap.end();
                resolve({ articles });
              });
            });
          });
        });
      });
    });
    
    imap.on('error', reject);
    imap.connect();
  });
}

run().catch(console.error);
