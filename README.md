# react-notes-micro-fe

A Micro-Frontend example using Webpack Module Federation

## Available Scripts

Navigate to these directories

- `/fe-core`
- `/note-input`
- `/notes-list`

and then run the following commands:

```bash
npm install
npm start
```

Navigate to:

- `http://localhost:3000` for the host (fe-core) app
- `http://localhost:4000` for the first remote (notes-list) app
- `http://localhost:4001` for the second remote (note-input) app

## Host App

Pulls `<NoteInput/>` and `<NotesList />` from the remote apps and renders them

```js
const NotesList = React.lazy(() => import('notes_list'));
const NoteInput = React.lazy(() => import('note_input'));
```

## Remote Apps

Exposes the modules in a `moduleEntry.js` file at `http://localhost:4000/moduleEntry.js` and `http://localhost:4001/moduleEntry.js`

`name: 'notes_list'`
`name: 'note_input'`

Exposes:

- `<NotesList />`
- `<NoteInput />`

## Techstack

- React
- Material UI

## Base code

[rautio/react-micro-frontend-example](https://github.com/rautio/react-micro-frontend-example)
