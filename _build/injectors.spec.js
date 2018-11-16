const { injectTrail, injectFooter } = require('./injectors');

describe('_build/injectors', () => {
  describe('injectTrail', () => {
    it('doesn`t inject anything if no trail requested', () => {
      const result = injectTrail(`
# Title
## Subtitle`);

      expect(result).toEqual(`
# Title
## Subtitle`);
    });

    it('injects a single heading', () => {
      const result = injectTrail(`
Trail: Heading1

# Title
## Subtitle`);

      expect(result).toEqual(`
<div class="trail">
  <h1>Heading1</h1>
</div>

# Title
## Subtitle`);
    });

    it('injects two headings', () => {
      const result = injectTrail(`
Trail: Heading1,Heading2

# Title
## Subtitle`);

      expect(result).toEqual(`
<div class="trail">
  <h1>Heading1</h1>
  <h2>Heading2</h2>
</div>

# Title
## Subtitle`);
    });

    it('injects three headings', () => {
      const result = injectTrail(`
Trail: Heading1,Heading2,Heading3

# Title
## Subtitle`);

      expect(result).toEqual(`
<div class="trail">
  <h1>Heading1</h1>
  <h2>Heading2</h2>
  <h3>Heading3</h3>
</div>

# Title
## Subtitle`);
    });
  });

  describe('injectFooter', () => {
    it('injects footer by default', () => {
      const result = injectFooter(`
# Title
## Subtitle`);

      expect(result).toEqual(`
# Title
## Subtitle

<div class="footer">
  stevenhicks.me/talk-url 🦄 @pepopowitz
</div>`);
    });

    it('skips footer when specified', () => {
      const result = injectFooter(`
Footer: false

# Title
## Subtitle`);

      expect(result).toEqual(`

# Title
## Subtitle`);
    });

    it('puts footer before notes', () => {
      const result = injectFooter(`
# Title
## Subtitle

Notes:
blah blah blah
`);

      expect(result).toEqual(`
# Title
## Subtitle

<div class="footer">
  stevenhicks.me/talk-url 🦄 @pepopowitz
</div>

Notes:
blah blah blah
`);
    });
  });
});
