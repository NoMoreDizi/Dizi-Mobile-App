# 🧑‍💻 Contributing Guide

We appreciate your interest in contributing to our project! This guide will help you get started.

## Commits

- Commits should abide by the **[Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)**.
  - **Examples:**
    - `feat: add user authentication`
    - `fix: correct typo in README`
    - `chore: update dependencies`

## Branches

- Branches should abide by the naming schema `<type>/<BranchDescriptionInPascalCase>`.
  - **`type`** can be `feat` (for features), `fix` (for bug fixes), or `chore` (for routine tasks like refactoring, dependency updates).
  - **`BranchDescriptionInPascalCase`** should be a concise description of the branch's purpose, written in PascalCase (e.g., `AddLoginFlow`, `ResolveDatabaseConnection`).
  - **Regex:** `^(feat|fix|chore)\/[A-Z][a-zA-Z0-9]*$`

## Pull Requests

- Discussions should ideally be resolved by the person starting them. If the original commenter is unavailable or the discussion is fully addressed, maintainers may resolve it.
- Pull Requests should ideally be closed by the creator. However, maintainers reserve the right to close stale, obsolete, or non-compliant PRs.
