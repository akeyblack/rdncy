import Storage from './storage.js';

export default class Visualizer {
    constructor(doc) {
        this.storage = new Storage();
        
        this.modal = doc.querySelector("#noteModal");
        this.table = doc.querySelector("#table tbody");
        this.statsTable = doc.querySelector("#statsTable tbody");
        this.modalForm = doc.querySelector(".modal__form");

        this.refresh();
    }

    isCreatingNote = false;
    isArchive = false;

    createTemplate (note, index) {
        return `
            <tr>
                <td>
                    <i class="fas fa-${this.getIcon(note.type)}"></i>
                </td>
                <td><div>${note.name}</div></td>
                <td><div>${note.created}</div></td>
                <td><div>${note.type}</div></td>
                <td><div>${note.content}</div></td>
                <td><div>${note.dates}</div></td>
                <td>
                    <button onclick="vis.openUpdateModal(${index})" class="btn btn-small fas fa-pencil-alt"/>
                </td>
                <td>
                    <button onclick="vis.archiveNote(${index})" class="btn btn-small btn-small_archive far fa-folder"/>
                </td>
                <td>
                    <button onclick="vis.deleteNote(${index})" class="btn btn-small fas fa-trash-alt"/>
                </td>
            </tr>
        `;
    }
    
    createStatsTemplate (name, active, archive) {
        return `
            <tr>
                <td>
                    <i class="fas fa-${this.getIcon(name)}"></i>
                </td>
                <td><div>${name}</div></td>
                <td><span>${active}</span></td>
                <td><span>${archive}</span></td>
            </tr>
        `
    }

    refresh () {
        let items = this.isArchive ? this.storage.getArchive() : this.storage.getArray();

        this.table.innerHTML = "";

        if (items.length===0) 
            this.table.innerHTML = "<tr><td>Empty</td></tr>"
    
        items.forEach((item, index) => {
            this.table.innerHTML += this.createTemplate(item, index);
        });
    
        this.refreshStats();
    }
    
    refreshStats () {
        this.statsTable.innerHTML = "";
    
        ["Task", "Random Thought", "Idea"].forEach(item => {
            this.statsTable.innerHTML += this.createStatsTemplate(item, this.storage.getNumOf(item, true), this.storage.getNumOf(item, false));
        });
    }   

    changeArchiveNote() {
        this.isArchive = !this.isArchive;
        this.table.className = this.isArchive ? "table__content_archive" : "table__content";

        this.refresh();
    }

    addUpdateNote() {
        this.modal.style.display = "none";
        let formData = new FormData(this.modalForm);
        this.modalForm.reset();

        if (this.isCreatingNote)
            this.storage.addNote(formData.get("name"), formData.get("content"), formData.get("type"));
        else 
            this.storage.updateNote(this.modal.dataset.index, formData.get("name"), formData.get("content"));
            
        this.isCreatingNote = false;
        this.refresh();
    }

    archiveNote(index) {
        if (this.isArchive)
            this.storage.deArchiveNote(index);
        else
            this.storage.archiveNote(index);
        this.refresh();
    }

    deleteNote(index) {
        this.storage.deleteNote(index);
        this.refresh();
    }

    openCreateModal() {
        this.isCreatingNote = true;
        this.modal.style.display = "block";
    }

    openUpdateModal(index) {
        this.isCreatingNote = false;
        this.modal.style.display = "block";
        this.modal.dataset.index = index;
    }

    closeModal() {
        this.isCreatingNote = false;
        this.modal.style.display = "none";
    }

    getIcon(type) {
        switch(type) {
        case "Random Thought":
            return "random";
        case "Task":
            return "tasks";
        case "Idea":
            return "lightbulb";
        }
    }
}