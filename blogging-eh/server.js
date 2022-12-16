const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const fs = require('fs');
const uuid = require('./utils/uuid')

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});








const {
  readFromFile,
  readAndAppend,
  } = require('./utils/fsUtils');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// -----------------------------------
// app.get('api/notes', (req,res) => {
//   res.json(makeNote.slice(1));
// })
// app.get('/api/notes', (req, res) => {
//   readFromFile('./db/db.json').then((data) => res.json(makeNote));
// });
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//---------------------------------------
function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
      notesArray = [];
  
  if (notesArray.length === 0)
      notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

// GET Route for retrieving all the note

app.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(makeNote));
});

// // POST Route for a new UX/UI tip
app.post('/', (req, res) => {
  console.log(req.body);

  if (req.body) {
    const newNote = {
      noteTitle,
      noteText,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json', './public/notes.html');
    res.json(`note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});


app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, makeNote);
  res.json(newNote);
});
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
