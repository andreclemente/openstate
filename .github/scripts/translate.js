const https = require('https');

const title = process.env.ISSUE_TITLE || '';
const body = process.env.ISSUE_BODY || '';
const issueNumber = process.env.ISSUE_NUMBER;
const owner = process.env.REPO_OWNER;
const repo = process.env.REPO_NAME;
const apiKey = process.env.OPENROUTER_API_KEY;
const ghToken = process.env.GH_TOKEN;

const fullText = (title + ' ' + body).toLowerCase();

// Portuguese detection using common words
const ptIndicators = [
  ' o ', ' a ', ' os ', ' as ', ' um ', ' uma ', ' de ', ' do ', ' da ',
  ' dos ', ' das ', ' em ', ' no ', ' na ', ' nos ', ' nas ', ' por ',
  ' para ', ' com ', ' sem ', ' que ', ' se ', ' é ', ' foi ', ' está ',
  ' tem ', ' são ', ' mais ', ' muito ', ' como ', ' mas ', ' ou ', ' não ',
  ' sim ', ' aqui ', ' agora ', ' hoje ', ' sempre ', ' nunca ', ' bem ',
  ' já ', ' ainda ', ' depois ', ' antes ', ' entre ', ' sobre ', ' até ',
  ' desde ', ' durante ', ' apenas ', ' mesmo ', ' outro ', ' outra ', ' cada ',
  ' todo ', ' toda ', ' grande ', ' pequeno ', ' novo ', ' velho ', ' bom ', ' mau ',
  ' problema ', ' sistema ', ' serviço ', ' público ', ' utente ', ' cidadão ',
  ' resolução ', ' solução ', ' evidência ', ' impacto ', ' causa ', ' raiz ',
  ' passo ', ' reproduzir ', ' afetado ', ' envolvido ', ' possível ', ' necessário ',
  ' relatório ', ' documento ', ' dados ', ' informação ', ' processo ', ' resultado '
];

let matchCount = 0;
for (const indicator of ptIndicators) {
  if (fullText.includes(indicator)) matchCount++;
}

if (matchCount < 5) {
  console.log(`Not enough Portuguese indicators (${matchCount}). Skipping translation.`);
  process.exit(0);
}

console.log(`Detected Portuguese (${matchCount} indicators). Translating...`);

const translatePrompt = `Translate this GitHub issue from Portuguese to English. Keep the same markdown structure and formatting. Only translate text content, not code, URLs, or proper nouns.

Title: ${title}

Body:

${body}

Respond with exactly this format:
---TITLE---
[translated title]
---BODY---
[translated body]`;

function httpsPost(url, data, headers) {
  return new Promise((resolve, reject) => {
    const hasBody = data != null;
    const body = hasBody ? JSON.stringify(data) : '';
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname,
      method: 'POST',
      headers: hasBody ? {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...headers
      } : {
        'Content-Length': 0,
        ...headers
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  try {
    // Translate via OpenRouter
    const resp = await httpsPost('https://openrouter.ai/api/v1/chat/completions', {
      model: 'google/gemini-2.5-flash',
      messages: [
        { role: 'system', content: 'You are a professional Portuguese-to-English translator. Preserve markdown structure and formatting.' },
        { role: 'user', content: translatePrompt }
      ],
      temperature: 0.3,
      max_tokens: 4000
    }, {
      'Authorization': 'Bearer ' + apiKey,
      'HTTP-Referer': 'https://github.com',
      'X-Title': 'OpenState'
    });

    if (resp.status !== 200) {
      console.error('API error:', resp.status, resp.body);
      process.exit(1);
    }

    const data = JSON.parse(resp.body);
    const translation = data.choices?.[0]?.message?.content;

    if (!translation) {
      console.error('Empty response from API');
      process.exit(1);
    }

    const titleMatch = translation.match(/---TITLE---\n([\s\S]*?)\n---BODY---/);
    const bodyMatch = translation.match(/---BODY---\n([\s\S]*)/);

    if (!titleMatch || !bodyMatch) {
      console.error('Could not parse translation response');
      process.exit(1);
    }

    const translatedTitle = titleMatch[1].trim();
    const translatedBody = bodyMatch[1].trim();

    const comment = [
      '## 🇬🇧 English Translation',
      '',
      '> This issue was written in Portuguese. Below is an automatic translation for English-speaking readers.',
      '',
      '### ' + translatedTitle,
      '',
      translatedBody,
      '',
      '---',
      '',
      '*This translation was auto-generated. The original issue above is the authoritative version.*'
    ].join('\n');

    // Post comment via GitHub API
    const postResp = await httpsPost(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
      { body: comment },
      {
        'Authorization': 'Bearer ' + ghToken,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'OpenState/1.0',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    );

    if (postResp.status === 201) {
      const commentId = JSON.parse(postResp.body).id;
      console.log('✅ Translation posted successfully (comment #' + commentId + ')');
      
      // Pin the comment
      await new Promise(r => setTimeout(r, 1000)); // small delay
      const pinResp = await httpsPost(
        `https://api.github.com/repos/${owner}/${repo}/issues/comments/${commentId}/pin`,
        null,
        {
          'Authorization': 'Bearer ' + ghToken,
          'Accept': 'application/vnd.github+json',
          'User-Agent': 'OpenState/1.0',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      );
      if (pinResp.status === 204 || pinResp.status === 200) {
        console.log('📌 Comment pinned');
      } else {
        console.warn('Could not pin comment:', pinResp.status, pinResp.body);
      }
    } else {
      console.error('Failed to post comment:', postResp.status, postResp.body);
      process.exit(1);
    }
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

main();
