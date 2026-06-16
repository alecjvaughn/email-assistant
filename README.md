# Email Assistant

## Description
The Email Assistant aims to transform the inbox from a chaotic stream into a structured, prioritized workspace. It targets professionals, news junkies, and students who need help managing high-volume emails.

## Goals & Value Proposition
- **Intelligent Triage**: Automated categorization of critical threads separate from noise.
- **Consolidated Digests**: AI-generated summaries to save time.
- **Smart Organization**: Nested labeling to maintain a structured inbox.

## Key Features
- AI Categorization & Labeling
- Dynamic Digests
- State Management (via centralized JSON)
- Audit Logging
- Manual Overrides

## Tech Stack
- Google Apps Script (JavaScript/TypeScript)
- OpenAI API or Google Gemini API
- HTML Service & Material Design CSS
- VS Code, ESLint, Prettier, Vitest, esbuild

## Project Status
- **Phase 1: Project Foundation & State Management**: COMPLETED. The project has been set up with `clasp`, the JSON configuration schema is defined, the `ConfigurationService` is implemented, and the build pipeline (using `esbuild`) is configured for Google Apps Script compatibility.
- **Phase 2: Gmail Integration & Labeling Logic**: COMPLETED. Implemented `GmailService` wrapper and `LabelManager` for nested label creation.
- **Phase 3: AI Categorization & Logging**: PENDING.

## Development Workflow
All work is tracked in `conductor/tracks.md` and detailed plans like `conductor/tracks/core_labeling_20260602/plan.md`. The workflow involves strict test-driven development (TDD), high code coverage, and non-interactive command execution. For detailed guidelines, refer to `conductor/workflow.md` and `conductor/product-guidelines.md`.
