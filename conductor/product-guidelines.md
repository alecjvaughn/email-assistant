# Product Guidelines

## Prose & Communication Style
- **Professional & Efficient**: All generated digests and summaries should use a professional, direct tone. Avoid unnecessary fluff.
- **Clarity First**: Prioritize clarity over brevity. Summaries should be easy to scan but comprehensive enough to convey key points.
- **Action-Oriented**: Highlight actionable items (e.g., follow-ups, payment deadlines) explicitly.

## User Experience (UX) Principles
- **Minimalism**: The integration within Gmail should be unobtrusive and feel like a native extension of the workspace.
- **Transparency**: Users should always be able to understand *why* an email was labeled a certain way (via logs or UI hints).
- **Consistency**: Use consistent naming conventions for nested labels (e.g., `Category/Sub-category`).
- **Control**: Provide clear paths for manual corrections; automated systems should augment, not replace, user control.

## Design & Aesthetics
- **Gmail Native**: UI components (sidebars, dialogs) should adhere to the Material Design standards used by Google Workspace.
- **Accessibility**: Ensure high contrast and support for screen readers where applicable in custom UI elements.
- **Visual Cues**: Use color-coding for labels sparingly to avoid visual clutter while aiding category recognition.

## Data & Privacy
- **Privacy-First**: Clearly state that email data is processed within the Google Apps Script environment.
- **Auditability**: Every automated change to labels or configuration must be logged for user review.
