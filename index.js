import {Tracker} from 'meteor/tracker'

const XS = 480;
const SM = 768;
const MD = 992;
const LG = 1200;

const ranges = {
  xxs: {min: 0, max: XS -1},
  xs: {min: XS, max: SM - 1},
  sm: {min: SM, max: MD - 1},
  md: {min: MD, max: LG - 1},
  lg: {min: LG, max: Number.POSITIVE_INFINITY}
};

const screen = 'only screen and ';
const landscape = '(orientation: landscape)';
const portrait = '(orientation: portrait)';
const min = (range) => `(min-width: ${ranges[range].min}px)`;
const max = (range) => `(max-width: ${ranges[range].max}px)`;

const resizeDep = new Tracker.Dependency;

const onResizeEvent = (e) => {
  resizeDep.changed();
};

const matchMedia = (...mediaQueries) => {
  resizeDep.depend();
  const queryStr = screen + mediaQueries.join(' and ');
  console.log(queryStr);
  return window.matchMedia(queryStr).matches;
};

window.addEventListener('resize', _.throttle(onResizeEvent, 100));

export default {
  isLandscape: () => matchMedia(landscape),
  isPortrait: () => matchMedia(portrait),

  isPortraitPhone: () => matchMedia(portrait, max('xxs')),
  isPortraitTablet: () => matchMedia(portrait, min('xs'), max('xs')),
  isPortraitDesktop: () => matchMedia(portrait, min('sm'), max('sm')),
  isPortraitLarge: () => matchMedia(portrait, min('md'), max('md')),
  isLandscapePhone: () => matchMedia(landscape, max('xs')),
  isLandscapeTablet: () => matchMedia(landscape, min('sm'), max('sm')),
  isLandscapeDesktop: () => matchMedia(landscape, min('md'), max('md')),
  isLandscapeLarge: () => matchMedia(landscape, min('lg')),

  isPortraitTabletAndUp: () => matchMedia(portrait, min('xs')),
  isPortraitDesktopAndUp: () => matchMedia(portrait, min('sm')),
  isLandscapeTabletAndUp: () => matchMedia(landscape, min('sm')),
  isLandscapeDesktopAndUp: () => matchMedia(landscape, min('md')),
}