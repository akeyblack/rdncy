class Visualizer {
    constructor(doc) {
        this.storage = new Storage();
        
        this.modal = doc.getElementById("noteModal");
        this.table = doc.getElementById("table").getElementsByTagName("tbody")[0];
        this.statsTable = doc.getElementById("statsTable").getElementsByTagName("tbody")[0];
        this.modalForm = doc.getElementsByClassName("modal__form")[0];

        this.refresh();
    }

    isCreatingNote = false;
    isArchive = false;

    createTemplate (note, index) {
        return `
            <tr>
                <td>${note.name}</td>
                <td>${note.created}</td>
                <td>${note.type}</td>
                <td>${note.content}</td>
                <td>${note.dates}</td>
                <td>
                    <button onclick="vis.openUpdateModal(${index})" class="table__update-button"/>
                    <button onclick="vis.archiveNote(${index})" class="table__archive-button"/>
                    <button onclick="vis.deleteNote(${index})" class="table__delete-button"/>
                </td>
            </tr>
        `;
    }
    
    createStatsTemplate (name, active, archive) {
        return `
            <tr>
                <td>${name}</td>
                <td>${active}</td>
                <td>${archive}</td>
            </tr>
        `
    }

    refresh () {
        let items = this.isArchive ? this.storage.archive : this.storage.array;

        this.table.innerHTML = "";

        if (items.length===0) 
            this.table.innerHTML = "<div>Nothing here!</div>"
    
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
        this.table.className = this.isArchive ? "table__content" : "table__content_archive";

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
}