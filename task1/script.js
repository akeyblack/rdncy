let closeBtn = document.getElementsByClassName("modal__close")[0];
let createBtn = document.getElementById("createBtn");
let mdlSubmit = document.getElementById("mdlSubmit");
let archiveBtn = document.getElementById("archiveBtn");

vis = new Visualizer(document);


createBtn.onclick = () => vis.openCreateModal();
closeBtn.onclick = () => vis.closeModal();
archiveBtn.onclick = () => vis.changeArchiveNote();
mdlSubmit.onclick = (e) => {
    e.preventDefault();
    vis.addUpdateNote();
}