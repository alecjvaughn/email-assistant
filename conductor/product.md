# Initial Concept
This app will label emails by sender/group and provide digests to the user based on the inbox.

# Email Assistant

## Target Users
- **Professionals**: Managing high-volume work emails with complex triage needs.
- **News Junkies**: Seeking consolidated, readable digests from numerous subscriptions.
- **Students**: Coordinating academic updates and group projects across multiple channels.

## Goals & Value Proposition
The Email Assistant aims to transform the inbox from a chaotic stream into a structured, prioritized workspace. Its core value lies in:
- **Intelligent Triage**: Automated categorization of critical threads (recruitment, support, payments) separate from noise (marketing).
- **Consolidated Digests**: Providing AI-generated summaries to save time while ensuring no important update is missed.
- **Smart Organization**: Utilizing nested labeling and AI to maintain a perfectly structured inbox.

## Key Features
- **AI Categorization & Labeling**: Automatic, nested labeling (e.g., `talent/Company Name`) using AI to interpret sender context.
- **Dynamic Digests**: Periodic summaries of inbox contents based on user-defined groups and priorities.
- **State Management**: System configuration and label state managed via a centralized JSON file.
- **Audit Logging**: Comprehensive logging of every automated action taken by the assistant.
- **Manual Overrides**: Robust support for manual configuration adjustments with distinct "definition" vs "creation" phases.

## Technical Scope
- **Environment**: Primary compatibility with **Google Apps Script**.
- **User Interface**: Integrated features accessible directly within the **Gmail UI**.
- **Platform**: Initial focus on Google Workspace/Gmail ecosystem.
