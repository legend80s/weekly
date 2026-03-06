#!/usr/bin/env node

const Imap = require('imap');
const { simpleParser } = require('mailparser');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

function extractArticlesFromText(text) {
  const categorySections = [
    { category: 'article', pattern: 'Articles of the Week' },
    { category: 'twitter', pattern: 'Tweet of the Week' },
    { category: 'pdf', pattern: 'PDF of the Week' },
    { category: 'book', pattern: 'Book of the Week' },
    { category: 'video', pattern: 'Video of the Week' },
    { category: 'feed', pattern: 'Feed of the Week' }
  ];

  const result = [];

  for (let i = 0; i < categorySections.length; i++) {
    const section = categorySections[i];
    const sectionStart = text.indexOf('## ' + section.pattern);
    if (sectionStart === -1) continue;
    
    let sectionEnd;
    if (i < categorySections.length - 1) {
      sectionEnd = text.indexOf('## ' + categorySections[i + 1].pattern);
    } else {
      sectionEnd = text.indexOf('\n\nUnsubscribe');
    }
    if (sectionEnd === -1) sectionEnd = text.length;
    
    const sectionText = text.substring(sectionStart, sectionEnd);
    const parts = sectionText.split('\n### ');
    
    const subArticles = [];
    
    for (let j = 1; j < parts.length; j++) {
      const block = parts[j];
      const lines = block.split('\n');
      const title = lines[0].trim();
      if (!title) continue;

      let url = '';
      let summary = '';
      let author = '';

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
      summary = summaryLines.join(' ');

      const authorMatch = block.match(/·\s*([^·\n]+)\s*·\s*(\d+\s*minutes?)/i);
      if (authorMatch) {
        author = authorMatch[1].trim();
      }

      if (url) {
        subArticles.push({
          title,
          url,
          img: '',
          summary,
          author: author || undefined
        });
      }
    }
    
    if (subArticles.length > 0) {
      result.push({
        category: section.category,
        subArticles
      });
    }
  }

  return result;
}

async function fetchEmailAndExtract() {
  const imap = new Imap({
    user: process.env.IMAP_USER,
    password: process.env.IMAP_PASS,
    host: process.env.IMAP_HOST,
    port: parseInt(process.env.IMAP_PORT),
    tls: process.env.IMAP_TLS === 'true',
    tlsOptions: {
      rejectUnauthorized: process.env.IMAP_REJECT_UNAUTHORIZED !== 'false',
    },
  });

  return new Promise((resolve, reject) => {
    imap.once('ready', async () => {
      try {
        const box = await new Promise((res, rej) => imap.openBox('INBOX', false, (err, box) => err ? rej(err) : res(box)));
        
        const results = await new Promise((res, rej) => imap.search([['SUBJECT', 'Wisereads Vol. 132']], (err, results) => err ? rej(err) : res(results)));
        
        if (results.length === 0) {
          console.log('No emails found');
          imap.end();
          resolve(null);
          return;
        }

        const fetch = imap.fetch(results[0], { bodies: [''] });
        
        fetch.on('message', (msg) => {
          msg.on('body', (stream) => {
            simpleParser(stream, (err, parsed) => {
              if (err) {
                reject(err);
                return;
              }

              const text = parsed.text || '';
              const articles = extractArticlesFromText(text);
              
              const args = process.argv.slice(2);
              const outputPath = args[0] || path.resolve(__dirname, '../../../readwise-weekly/generated/6.json');
              
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
      } catch (err) {
        reject(err);
      }
    });

    imap.on('error', reject);
    imap.connect();
  });
}

fetchEmailAndExtract().catch(console.error);
