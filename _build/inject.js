const { injectTrail, injectFooter } = require('./injectors');

module.exports = (markdown, options) => {
  return new Promise((resolve, reject) => {
    console.log(JSON.stringify(markdown, null, 2));

    const slides = markdown.split(`\n---\n`);

    const injected = slides.map(inject);

    resolve(injected.join('\n---\n'));
  });
};

function inject(slide) {
  return injectTrail(injectFooter(slide));
}
