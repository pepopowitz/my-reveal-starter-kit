Reveal.addEventListener('slidechanged', reloadSvgBackgrounds);

function reloadSvgBackgrounds(event) {
  // busts the cache of svg backgrounds so that they are re-loaded

  const backgroundStyle =
    event.currentSlide.slideBackgroundContentElement.style;
  const backgroundImage = backgroundStyle.backgroundImage;

  // if it doesn't have a ?v=1 on it yet, put one on it
  const svgWithoutVersionRegex = /url\(\"(.*\.svg)\"\)/;
  const matchWithoutVersion = svgWithoutVersionRegex.exec(backgroundImage);
  if (matchWithoutVersion) {
    const url = matchWithoutVersion[1];
    backgroundStyle.backgroundImage = `url("${url}?v=1")`;
  }

  // if it already has a version on it, increment it
  const svgWithVersionRegex = /url\(\"(.*\.svg)\?v=(\d*)\"\)/;
  const matchWithVersion = svgWithVersionRegex.exec(backgroundImage);
  if (matchWithVersion) {
    const url = matchWithVersion[1];
    const version = parseInt(matchWithVersion[2], 10);
    backgroundStyle.backgroundImage = `url("${url}?v=${version + 1}")`;
  }
}
