import express from 'express';

import notesRouter  from './routes/notes.js';

import Storage from './repositories/storage.js';

const app = express();
const port = 3000;

export let storage = new Storage();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/notes', notesRouter);

app.get('/', (req, res) => {
    res.status(200).send("Use /notes");
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

export default app;