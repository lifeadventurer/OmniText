# Changelog

All notable changes to OmniText will be documented in this file.

## [v1.0.1] - 2026-03-21

### Fixed

- Bumped the app and service worker cache versions so updated app assets are
  delivered reliably after deployment

## [v1.0.0] - 2026-03-21

### Added

- Zero-build client-side phrase board built with plain HTML, CSS, and
  JavaScript
- Save, display, and delete custom phrases directly in the browser
- Fullscreen phrase preview for quick visual communication
- Browser `localStorage` persistence for saved phrases and UI settings
- Progressive Web App support with installable manifest and offline caching
- Phrase usage tracking with optional sorting by usage and optional usage
  badges
- Opt-in long-text scrolling for overflowing saved phrase labels
- Shared scroll speed control for long-text scrolling behavior
- Fullscreen preview support for long text with vertical auto-scroll
- Browser-native text-to-speech controls in the fullscreen preview when
  supported

### Changed

- Long text is easier to read in both the saved phrase list and fullscreen
  preview
- Fullscreen preview auto-scroll pauses during manual interaction and resumes
  after a short idle delay
- Reduced-motion users keep manual scrolling without forced preview auto-scroll
- Saved phrase controls and settings layout adapt cleanly across mobile and
  desktop sizes

### Notes

- Text-to-speech depends on browser support for `speechSynthesis`
- OmniText remains a zero-build, client-side app intended for GitHub Pages
  deployment
