const settings = require('./settings.json');

function injectTrail(slide) {
  const regex = /^Trail: (.*)$/m;

  const match = slide.match(regex);

  if (!match) {
    return slide;
  }

  const rawTrail = match[1]; // second item is actual capture group (so, what comes after `Trail: `)

  const trailBitElements = buildTrailBitElements(rawTrail);

  const element = `<div class="trail">
${trailBitElements.join('\n')}
</div>`;

  return slide.replace(regex, element);
}

function buildTrailBitElements(rawTrail) {
  const trailBits = rawTrail.split(',');
  return trailBits.map((item, index) => {
    if (index === 0) {
      return `  <h1>${item}</h1>`;
    }
    if (index === 1) {
      return `  <h2>${item}</h2>`;
    }
    return `  <h3>${item}</h3>`;
  });
}

function injectFooter(slide) {
  const hideFooterRegex = /Footer: false\n/m;
  const hideFooter = slide.match(hideFooterRegex);

  if (hideFooter) {
    return slide.replace(hideFooterRegex, '');
  }

  const notesRegex = /^Notes:(.*)$/m;
  const notesMatch = slide.match(notesRegex);

  if (notesMatch === null) {
    return appendFooter(slide);
  }

  return insertFooterBeforeNotes(slide, notesMatch);
}

function appendFooter(slide) {
  return `${slide}

<div class="footer">
  ${settings.talkUrl} 🦄 @pepopowitz
</div>`;
}

function insertFooterBeforeNotes(slide, notesMatch) {
  return `${slide.substring(0, notesMatch.index)}<div class="footer">
  ${settings.talkUrl} 🦄 @pepopowitz
</div>

${slide.slice(notesMatch.index)}`;
}

function injectLayout(slide) {
  const regex = /^Layout: (.*)$/m;

  const match = slide.match(regex);

  if (!match) {
    return slide;
  }

  const layout = match[1];

  const background = identifyBackground(layout);

  const element = `<!-- .slide: class="${layout}" ${background} -->`;

  return `\n${element}\n${slide.replace(regex, '')}`;
}

function injectLineNumbers(slide) {
  const regex = /^LineNumbers: (.*)$/m;

  const match = slide.match(regex);

  if (!match) {
    return slide;
  }

  const lineNumbers = match[1];

  const codeRegex = /```(\S*)\n((.|\n)*)```/m;
  const codeMatch = slide.match(codeRegex);

  if (!codeMatch) {
    return slide;
  }

  const replaceFenceWithCode = `<pre class="line-numbers"><code class="hljs lang-\$1" data-highlight-lines="${lineNumbers}">$2</code></pre>`;

  return slide.replace(regex, '').replace(codeRegex, replaceFenceWithCode);
}

function identifyBackground(layout) {
  const backgroundColors = {
    title: 'var(--brand)',
    module: 'var(--brand-module-bg)',
  };
  if (backgroundColors[layout]) {
    return `data-background="${backgroundColors[layout]}"`;
  }
  return '';
}

function injectWrapper(slide) {
  const regex = /^Wrapper: (.*)$/m;

  const match = slide.match(regex);

  if (!match) {
    return slide;
  }

  const wrapper = match[1];

  return `\n<div class="${wrapper}">\n${slide.replace(regex, '')}\n</div>`;
}

module.exports = {
  injectTrail,
  injectFooter,
  injectLayout,
  injectLineNumbers,
  injectWrapper,
};
