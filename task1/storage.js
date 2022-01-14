class Note {
    constructor(name, content, type) {
        this.name = name;
        this.content = content;
        this.type = type;
        try {
            this.created = moment().format("LL");
        }
        catch (e) {
            this.created = "Can't read date";
        }
        this.dates = content.match(/\d{2}([\/.-])\d{2}\1\d{4}/g) || "";
    }
}

class Storage {
    constructor() {
        this.array = [
            new Note("Shopping List", "Tomatoes, break", "Task"),
            new Note("The theory of evolution", "The evolution...", "Random Thought"),
            new Note("New Feature", "Implement new something, 3/5/2021, 5/5/2021", "Idea"),
            new Note("William Gaddis", "Power doesn't...", "Random Thought"),
            new Note("Books", "The Lean Startup", "Task")
        ];
        this.archive = [];
    }

    addNote(name, content, type) {
        this.array.push(new Note(name, content, type)); 
    }

    updateNote(index, name, content) {
        this.array[index] = new Note(name, content, this.array[index].type);
    }
    
    deleteNote(index) {
        return this.array.splice(index, 1)[0];
    }

    archiveNote(index) {
        this.archive.push(this.deleteNote(index));
    }
    
    deArchiveNote(index) {
        this.array.push(this.archive.splice(index, 1)[0]);
    }

    getNumOf(name, isActive) {
        let items = isActive ? this.array : this.archive;
        return items.filter(x => x.type === name).length;
    } 
}