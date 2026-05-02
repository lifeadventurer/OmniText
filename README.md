# OmniText

A zero-build, client-side phrase board app built with plain HTML, CSS, and
JavaScript.

Designed for people who have difficulty speaking (e.g., when they are sick),
OmniText allows you to save your favorite words or sentences and display them
instantly in full screen for quick and easy communication.

## Features

- **Zero Build:** No complex build tools or frameworks needed. Just plain HTML,
  CSS (via Tailwind CDN and inline styles), and JavaScript.
- **Client-Side:** Runs entirely in the user's browser.
- **Local Storage:** Saved phrases are stored directly in your browser's
  `localStorage`, keeping your data private and readily available.
- **Full-Screen Display:** Tap a saved phrase to display it prominently in full
  screen, making it easy for others to read.
- **Usage Tracking:** Each saved phrase tracks usage count and last-used time.
- **Optional Sorting by Usage:** Enable or disable sorting phrases based on how
  frequently they are used.
- **Optional Usage Display:** Show or hide the usage count for each phrase.
- **Optional Long-Text Scrolling:** Enable or disable scrolling for long text.
  Saved phrase labels can scroll horizontally when they overflow, and long
  fullscreen preview text can auto-scroll vertically.
- **Adjustable Scroll Speed:** When long-text scrolling is enabled, a slider
  lets you make both label scrolling and preview scrolling slower or faster.
- **Manual Preview Handoff:** In the fullscreen preview, users can manually
  scroll long text to keep up with speech or reading. Auto-scroll pauses during
  interaction and resumes shortly after.
- **Text-to-Speech (TTS):** A browser-native **Speak / Stop** control is shown
  in the fullscreen preview when supported by the browser.
- **TTS Language Selection:** Choose a preferred speech language/voice group in
  settings so browser text-to-speech does not always fall back to the default
  voice.
- **Reduced Motion Support:** If the user prefers reduced motion, OmniText keeps
  long text manually scrollable without forcing auto-scroll animations.
- **Progressive Web App (PWA):**
  - **Installable:** Add OmniText to your device's home screen for quick access,
    just like a native app.
  - **Offline Support:** Thanks to the Service Worker, the core application
    assets are cached, allowing you to access and use your saved phrases even
    without an internet connection.
- **Responsive Design:** Adapts to various screen sizes, from mobile phones to
  desktops.

## How to Use

1. Enter a phrase or sentence into the text input field.
2. Click "Add Text" or press Enter to save the phrase.
3. Saved phrases appear below as buttons.
4. Click any saved phrase button to display it in full screen.
5. In fullscreen view, tap **Speak** to read the phrase aloud when your browser
   supports text-to-speech.
6. If **Scroll long text** is enabled, long fullscreen text can auto-scroll.
   You can manually scroll at any time, and OmniText will resume auto-scrolling
   after a short pause.
7. Tap anywhere on the full-screen display to dismiss it.
8. Click the "✕" button next to a phrase to delete it (requires confirmation).
9. Click the "Clear All Phrases" button to remove all saved phrases (requires
   confirmation).
10. Toggle **Sort by usage** to order phrases by frequency instead of insertion
    order.
11. Toggle **Show usage** to display or hide the usage count badges.
12. Toggle **Scroll long text** to enable or disable long-text scrolling.
13. Use the **Scroll speed** slider to adjust scrolling speed when scrolling is
    enabled.
14. If you use **Speak**, choose a **TTS language** in settings to match the
    phrase language when your browser offers that voice.

## Browser Notes

- OmniText is dependency-free and uses browser-native features where possible.
- Text-to-speech relies on the browser's `speechSynthesis` support, so voice
  quality and available voices may vary by browser and device.
- TTS language choices only work when your browser/device exposes a compatible
  voice for that language.
- If browser TTS is unavailable, the **Speak** control is hidden automatically.
