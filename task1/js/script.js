import Visualizer from './visualizer.js';

let closeBtn = document.querySelector(".modal__close");
let createBtn = document.querySelector("#createBtn");
let mdlSubmit = document.querySelector("#mdlSubmit");
let archiveBtn = document.querySelector("#archiveBtn");
vis = new Visualizer(document);


createBtn.addEventListener(() => vis.openCreateModal()); //just for using addEventListener
closeBtn.onclick = () => vis.closeModal();
archiveBtn.onclick = () => vis.changeArchiveNote();
mdlSubmit.onclick = (e) => {
    e.preventDefault();
    vis.addUpdateNote();
}