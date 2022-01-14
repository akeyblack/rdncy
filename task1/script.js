let modal = document.getElementById("nodeModal");
let closeBtn = document.getElementsByClassName("modal__close")[0];
let createBtn = document.getElementById("createBtn");
let mdlSubmit = document.getElementById("mdlSubmit");
let archiveBtn = document.getElementById("archiveBtn");

let table = document.getElementById("table").getElementsByTagName("tbody")[0];

let modalForm = document.getElementsByClassName("modal__form")[0];

let isCreatingNode = false;

createBtn.onclick = () => {
    modal.style.display = "block";
    isCreatingNode = true;
}

closeBtn.onclick = () => {
    modal.style.display = "none";
    isCreatingNode = false;
}

window.onclick = (e) => {
    if (e.target == modal ) {
        modal.style.display = "none";
        isCreatingNode = false;
    }
}

const changeArchiveMode = () => {
    isArchive = !isArchive;
    table.className = isArchive ? "table__content" : "table__content_archive";
    refresh();
}

archiveBtn.onclick = () => changeArchiveMode();


let array = new Array();
let archive = new Array();
let isArchive = false;


const createTemplate = (node, index) => {
    return `
        <tr>
            <td>${node.name}</td>
            <td>${node.created}</td>
            <td>${node.type}</td>
            <td>${node.content}</td>
            <td>${node.dates}</td>
            <td>
                <button onclick="updateNode(${index})" class="table__update-button"/>
                <button onclick="archiveNode(${index})" class="table__archive-button"/>
                <button onclick="deleteNode(${index})" class="table__delete-button"/>
            </td>
        </tr>
    `;
}

const refresh = () => {
    let items = isArchive ? archive : array;
    table.innerHTML = "";

    items.forEach((item, index) => {
        table.innerHTML += createTemplate(item, index);
    });
}

const updateNode = index => {
    modal.style.display = "block";
    modal.dataset.index = index;
}

const archiveNode = index => {
    archive.push(deleteNode(index));
}

const deArchiveNode = index => {
    array.push(archive.splice(index, 1)[0]);
}

const deleteNode = index => {
    let node = array.splice(index, 1)[0];
    refresh();
    return node;
}

mdlSubmit.onclick = (e) => {
    e.preventDefault();
    modal.style.display = "none";
    let formData = new FormData(modalForm);
    modalForm.reset();

    if (isCreatingNode) {
        array.push(new Node(formData.get("name"), formData.get("content"), formData.get("type"))); 

        isCreatingNode = false;
    } 
    else 
        array[modal.dataset.index] = new Node(formData.get("name"), formData.get("content"), array[modal.dataset.index].type);
    refresh();
}