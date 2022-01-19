import { findDates, getDate } from "../helpers/notes.js"; 

class Note {
    constructor(id, name, content, type) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.type = type;
        this.create = getDate();
        this.dates = findDates(content)
    }
}   

export default class Storage {
    constructor() {
        this.array = [
            new Note(this.lastid++, "Shopping List", "Tomatoes, break", "Task"),
            new Note(this.lastid++, "The theory of evolution", "The evolution...", "Random Thought"),
            new Note(this.lastid++, "New Feature", "Implement new something, 13/12/2021 , 25/12/2021", "Idea"),
            new Note(this.lastid++, "William Gaddis", "Power doesn't...", "Random Thought"),
            new Note(this.lastid++, "Books", "The Lean Startup", "Task"),
            new Note(this.lastid++, "What if", "What if ", "Idea"),
            new Note(this.lastid++, "Shopping List2", "Apples for 1.1.12", "Task")
        ];
        this.archive = [];
    }
    
    lastid = 0;

    getArray() {
        return [...this.array];
    }

    getArchive() {
        return [...this.archive];
    }

    getById(id) {
        return this.array.find( x => x.id === id);
    }

    addNote(name, content, type) {
        this.array.push(new Note(this.lastid, name, content, type)); 
        return this.lastid++;
    }

    updateNote(id, name, content) {
        let index = this.array.findIndex(x => x.id === id);
        if (index === -1)
            return null;
        this.array[index] = new Note(this.array[index].id, name, content, this.array[index].type);
        return id;
    }
    
    deleteNote(id) {
        let index = this.array.findIndex(x => x.id === id);
        if (index === -1)
            return null;
        return this.array.splice(index, 1)[0];
    }

    archiveNote(id) {
        let index = this.array.findIndex(x => x.id === id);
        if (index === -1)
            return null;
        this.archive.push(this.deleteNote(id));
    }
    
    deArchiveNote(id) {
        let index = this.archive.findIndex(x => x.id === id);
        if (index === -1)
            return null;
        this.array.push(this.archive.splice(index, 1)[0]);
    }

    getNumOf(name, isActive) {
        let items = isActive ? this.array : this.archive;
        return items.filter(x => x.type === name).length;
    } 
}