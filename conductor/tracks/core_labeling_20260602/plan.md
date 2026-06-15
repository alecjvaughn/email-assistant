# Implementation Plan: Implement Core Smart Labeling and JSON Configuration

## Phase 1: Project Foundation & State Management [checkpoint: 6219e6e]
- [x] Task: Set up Google Apps Script project with `clasp` 2e4891b
- [x] Task: Define JSON configuration schema for labels and rules d588fe5
- [x] Task: Implement `ConfigurationService` (Read/Write JSON) e54fba5
    - [x] Write mock unit tests for property storage interaction
    - [x] Validate service logic using `src/config.sample.json` as real data
    - [x] Implement service with dependency injection for storage
- [x] Configure Build Pipeline for GAS Compatibility b473681
    - [x] Install `esbuild` and `esbuild-gas-plugin`
    - [x] Implement `build.js` to bundle TypeScript into GAS-compatible JavaScript
    - [x] Configure `.clasp.json` to push from `dist/` directory
- [x] Task: Conductor - Phase 1 Verification & Sanity Check 99b669b
    - [x] Perform contract validation (local)
    - [x] Run smoke test via `clasp run` to verify PropertyService availability
    - [x] HITL Approval of testing results and pre-deployment state
- [x] Task: Conductor - User Manual Verification 'Phase 1: Project Foundation & State Management' (Protocol in workflow.md) 6219e6e

> **Discovery Note (2026-06-02):** Google Apps Script (V8) does not support modern ES modules (`import`/`export`). To maintain modular TypeScript development while ensuring production compatibility, a build step is required. We will use `esbuild` with `esbuild-gas-plugin` to bundle our code into a flat global scope before pushing with `clasp`.
...
## Phase 2: Gmail Integration & Labeling Logic
- [ ] Task: Implement `GmailService` wrapper for label creation
    - [ ] Write mock unit tests for GmailApp interaction
    - [ ] Implementation of nested label creation logic
- [ ] Task: Implement `LabelManager` for nested labeling logic (`talent/Company`)
    - [ ] Write unit tests for nested label parsing and creation using sample data
    - [ ] Implementation of manager logic
- [ ] Task: Conductor - Phase 2 Verification & Sanity Check
    - [ ] Perform contract validation (local)
    - [ ] Run smoke test via `clasp run` to verify GmailApp availability
    - [ ] HITL Approval of testing results and pre-deployment state
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Gmail Integration & Labeling Logic' (Protocol in workflow.md)

## Phase 3: AI Categorization & Logging
- [ ] Task: Implement `CategorizationService` (AI API integration)
    - [ ] Write mock unit tests for API responses
    - [ ] Validate with sample email payloads
    - [ ] Implementation of AI provider integration
- [ ] Task: Implement `AuditLogger` for recording label changes
    - [ ] Write mock unit tests for log storage
    - [ ] Implementation of logging logic
- [ ] Task: Integrate components to label an email based on sender analysis
- [ ] Task: Conductor - Phase 3 Verification & Sanity Check
    - [ ] Perform contract validation (local)
    - [ ] Run smoke test via `clasp run` to verify end-to-end connectivity
    - [ ] HITL Approval of testing results and pre-deployment state
- [ ] Task: Conductor - User Manual Verification 'Phase 3: AI Categorization & Logging' (Protocol in workflow.md)

## Phase: Review Fixes
- [x] Task: Apply review suggestions ff2e9d8
- [x] Task: Apply documentation and type safety improvements 31dbf70
