import { validation } from '../services/validation.js';
import { createNoteSchema, getByIdNoteSchema, updateNoteSchema } from '../services/validationSchemes.js';
import { storage } from '../app.js';

import express from 'express'

const notesRouter = express.Router();

notesRouter.get('/', (req, res) => {
    res.status(200).json(storage.getArray())
});

notesRouter.get('/archive', (req, res) => {
    res.status(200).json(storage.getArchive())
});

notesRouter.get('/:id', validation(getByIdNoteSchema), (req, res) => {
    let result = storage.getById(Number(req.params.id));
    if (result === null)
        res.status(404).json({
            error: `Note with id: ${req.params.id} not found`
        })
    else
        res.status(200).send(result);
});

notesRouter.delete('/:id', validation(getByIdNoteSchema), (req, res) => {
    let result = storage.deleteNote(Number(req.params.id));
    if (result === null)
        res.status(404).json({
            error: `Note with id: ${req.params.id} not found`
        })
    else
        res.status(200).send();
});

notesRouter.post('/', validation(createNoteSchema), (req, res) => {
    let body = req.body;
    res.status(200).json({
        id: storage.addNote(body.name, body.content, body.category) 
    });
});

notesRouter.patch('/:id', validation(updateNoteSchema), (req, res) => {
    let body = req.body;
    let result = storage.updateNote(Number(req.params.id), body.name, body.content);
    if (result === null)
        res.status(404).json({
            error: `Note with id: ${req.params.id} not found`
        });
    else
        res.status(200).send();
});

notesRouter.patch('/archive/:id', validation(getByIdNoteSchema), (req, res) => {
    let result = storage.archiveNote(Number(req.params.id));
    if (result === null)
        res.status(404).json({
            error: `Note with id: ${req.params.id} not found`
        })
    else
        res.status(200).send();
});

notesRouter.patch('/unArchive/:id', validation(getByIdNoteSchema), (req, res) => {
    let result = storage.deArchiveNote(Number(req.params.id));
    if (result === null)
        res.status(404).json({
            error: `Note with id: ${req.params.id} not found`
        })
    else
        res.status(200).send();
});

notesRouter.get('/stats', (req, res) => {
    let result = ["Random Thought", "Idea", "Task"].map( x => ({
        active: storage.getNumOf(x, true),
        archive: storage.getNumOf(x, false)
    }));
    res.status(200).json(result);
});

export default notesRouter;
