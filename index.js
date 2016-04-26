import {ReactiveVar} from 'meteor/reactive-var'
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
const min = (range) => `(min-width: ${ranges[range].min})`;
const max = (range) => `(max-width: ${ranges[range].max})`;

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

  isPortraitPhone: () => matchMedia(portrait, max(XXS)),
  isPortraitTablet: () => matchMedia(portrait, min(XS), max(XS)),
  isPortraitDesktop: () => matchMedia(portrait, min(SM), max(SM)),
  isPortraitLarge: () => matchMedia(portrait, min(MD), max(MD)),
  isLandscapePhone: () => matchMedia(landscape, max(XS)),
  isLandscapeTablet: () => matchMedia(landscape, min(SM), max(SM)),
  isLandscapeDesktop: () => matchMedia(landscape, min(MD), max(MD)),
  isLandscapeLarge: () => matchMedia(landscape, min(LG)),

  isPortraitTabletAndUp: () => matchMedia(portrait, min(XS)),
  isPortraitDesktopAndUp: () => matchMedia(portrait, min(SM)),
  isLandscapeTabletAndUp: () => matchMedia(landscape, min(SM)),
  isLandscapeDesktopAndUp: () => matchMedia(landscape, min(MD)),
}