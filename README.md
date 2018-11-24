# My Reveal Starter Kit

A starting point for new slide decks.

Built on [Reveal.js](https://github.com/hakimel/reveal.js) and [reveal-md](https://github.com/webpro/reveal-md).

For most things, refer to the docs in those two projects.

## Differences from reveal-md & Reveal.js

### Multiple markdown sources

I like to break my talks into multiple source files, based upon sections.

Any .md files in ./src which start with a number will be stitched together before the talk is rendered. They are stitched in alphabetical order, which is effectively "numerical" order if you number them appropriately.

To exclude a .md file from the stitching, name it something like `xx-unused.md`. I do this when I've got works in progress, and I'm not sure if I'm ready to delete things.

Example:

```
01_intro.md
02_guts.md
03_outro.md
xx_not_needed.md
```

Files 01-03 above would be stitched together for the final slideshow; xx_not_needed would not.

### Custom "layouts"

Custom "layouts" are accomplished by applying a custom CSS class to a slide. You can do this by specifying a .slide modifier within a slide (`<!-- .slide: class="special" data-background="#ff5500" -->`), or by specifying `Layout: special` at the top of a slide.

For example, both of the following slide definitions will apply a `.module` class.

```
---
Layout: module

...

---

<!-- .slide: class="module" -->

...

---
```

### Custom CSS

The file [/\_build/custom.css](/_build/custom.css) is included in the rendered talk.

### Context trails

Many times I'll put a "trail" in the header of a slide, like breadcrumbs, to give the audience context on what I'm talking about.

This can be accomplished by adding a `Trail:` property to the top of a slide.

For example, the following slide will render a context trail of 'First | Second | Third' at the beginning of the slide:

```
---
Trail: First,Second,Third

...

---
```

The rendered markup looks like this:

```html
<div class="trail">
  <h1>First</h1>
  <h2>Second</h2>
  <h3>Third</h3>
</div>
```

### Footer

I like to show a footer on every slide that contains the URL for the deck, and my Twitter name.

Every slide will render the footer, by default.

The URL of the footer can be edited in [/\_build/settings.json](/_build/settings.json).

#### Turning off the footer

To disable the footer in a specific slide, add a `Footer: false` property to the top of the slide.

## Creating a new talk

1. `git clone <url>` to clone this repo
1. `rm -rf .git` to detach from git
1. `git init` to initialize new git repo
1. `git remote add origin <url>` to re-attach to remote
1. Update stuff!

### Things to update

#### package.json

Update all references to `my-reveal-starter-kit`

#### Title

The HTML title of the deck is found in [/slides/src/00-layouts.md](/slides/src/00-layouts.md). You should change it.

#### Slides!

They're all in slides/src. You probably don't want to change 00-layouts.md, but the rest you will definitely want to update.

#### Colors

Colors are defined as CSS variables in [/\_build/custom.css](/_build/custom.css). Change them!

#### Title image

I usually like to base the color scheme off of a custom title image (usually found at [unsplash.com](http://unsplash.com)).

Grab a new image, shrink it/optimize it, and replace [/images/title.jpg](/images/title.jpg).

## Things I need to account for yet

- offline (pulling in webfonts, mainly)

## Nice to have

- friendlier fragment syntax (currently `<!-- .element: class="fragment" -->`)
- friendlier custom css per slide syntax (currently `<!-- .slide: class="steve" data-background="#ff5500" -->`)
- sass/something to make handling lotsa css easier
- custom fonts
- build a real actual custom theme?
