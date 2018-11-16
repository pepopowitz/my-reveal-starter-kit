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

const footerRegex = /Footer: false\n/m;

function injectFooter(slide) {
  const match = slide.match(footerRegex);

  if (match) {
    return slide.replace(footerRegex, '');
  }

  const notesRegex = /^Notes:(.*)$/m;
  const notesMatch = slide.match(notesRegex);

  if (notesMatch === null) {
    return appendFooter(slide);
  }

  return insertFooterBeforeNotes(slide, notesMatch);
}

function appendFooter(slide) {
  return `${slide.replace(footerRegex, '')}

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

function identifyBackground(layout) {
  const backgroundColors = {
    title: 'var(--brand)',
    module: 'var(--brand-context)',
  };
  if (backgroundColors[layout]) {
    return `data-background="${backgroundColors[layout]}"`;
  }
  return '';
}

module.exports = {
  injectTrail,
  injectFooter,
  injectLayout,
};
