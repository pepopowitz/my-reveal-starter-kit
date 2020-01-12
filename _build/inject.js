const {
  injectTrail,
  injectFooter,
  injectLayout,
  injectLineNumbers,
  injectWrapper,
} = require('./injectors');

module.exports = (markdown, options) => {
  return new Promise((resolve, reject) => {
    const slides = markdown.split(`\n---\n`);

    const injected = slides.map(inject);

    resolve(injected.join('\n---\n'));
  });
};

function inject(slide) {
  return injectTrail(
    injectFooter(injectLayout(injectLineNumbers(injectWrapper(slide))))
  );
}
