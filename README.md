# Task Manager App

A clean React task manager with localStorage persistence.

## Features

- Add, complete, and delete tasks
- Filter by All / Pending / Completed
- Tasks saved in localStorage (survive page refresh)
- Task count stats (Total, Completed, Pending)
- Clear all completed tasks at once

## Tech Stack

- React 18
- React-Bootstrap
- Bootstrap 5
- localStorage (no backend needed)

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start
```

App will open at http://localhost:3000

## Project Structure

```
src/
  App.jsx        # Main component — state, logic, layout
  TaskCard.jsx   # Reusable task item component
  App.css        # All styles
```
