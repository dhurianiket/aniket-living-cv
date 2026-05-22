# Agent Rules (agent.md)

These instructions define the boundaries for AI edits in this repository. Follow these constraints closely to ensure the integrity of the project.

## Core Directives
- **Protect the Theme**: The current visual style and aesthetic (the dark mode theme, fonts, specific Tailwind color palette configuration, animations, etc.) MUST NOT be altered.
- **Protect the Component Architecture**: The structural organization of components (`/src/components`) is finalized. Do not restructure, delete, or rename working components without express permission.
- **Protect Firebase Setup**: Do not modify any Firebase setup including `firebase.json`, `.firebaserc`, database connection logic, Firebase schema (`firestore.rules`), or environment configuration. 
- **Protect Deployment Setup**: Refrain from making unrequested changes to build scripts, Vite configs, deployment workflows, or any project-level configuration files (`package.json`, `tsconfig.json`).
- **Preserve Existing Content**: Do not alter, omit, or overwrite factually correct CV information, biography details, projects, timeline, or any other correctly structured content unless explicitly instructed to correct a factual error.

## Modifying Existing Content
When instructed to edit content:
- Base all modifications strictly on provided source-of-truth copy (like a user-provided CV).
- Fit any required content additions elegantly within the current UI without adding new sections or breaking the layout.
- Fact-check changes before saving. Do not "invent" details.
