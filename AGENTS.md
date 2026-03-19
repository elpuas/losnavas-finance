# AGENTS.md

You are working on a small family finance application.

## Scope

- This is a private internal tool
- Focus on simplicity and correctness
- Do not introduce unnecessary abstractions

## Responsibilities

- Implement Supabase integration
- Maintain correct financial calculations
- Keep components clean and minimal

## Constraints

- Do not change UI structure unless explicitly requested
- Do not introduce new libraries without justification
- Avoid complex architecture patterns

## Data Model

- periods (biweekly ranges)
- expenses (type: fixed | extra)
- income

## Core Logic

remaining = income - fixed - extra  
split = remaining / 2  

## Engineering Principles

- Prefer clarity over cleverness
- Prefer small functions
- Avoid over-engineering
- Keep data flow predictable

## Output Expectations

- Production-ready code
- Readable and maintainable
- Minimal changes outside requested scope

## Git Workflow

- Create a new branch from main before making changes
- Use descriptive branch names (e.g. feature/supabase-integration)
- Do not push directly to main
- Keep commits focused and minimal
- Do not rewrite history or force push

## Change Logging (Mandatory)

- Every task must generate a log file inside the `.context/` folder
- If the folder does not exist, create it

### File naming

Use the following format:

.context/YYYY-MM-DD-HHMM-[short-task-name].md

Example:
.context/2026-03-19-0930-supabase-client.md

### Content requirements

Each log file must include:

- Task summary
- Files created or modified
- Description of changes
- Any assumptions made
- Next possible steps (if relevant)

### Constraints

- Do not overwrite existing logs
- Always create a new file per task
- Keep logs concise and readable