export const ADD_NOTE = "ADD_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const ARCHIVE_NOTE = "ARCHIVE_NOTE";
export const DEARCHIVE_NOTE = "DEARCHIVE_NOTE";
export const CHANGE_MODE = "CHANGE_MODE";
export const UPDATE_MODAL_STATUS = "UPDATE_MODAL_STATUS";


export const addNote = (name, content, type, created) => ({
    type: ADD_NOTE,
    payload: {
        name: name,
        content: content,
        type: type,
        created: created
    }
});

export const updateNote = (index, name, content) => ({
    type: UPDATE_NOTE,
    payload: {
        index: index,
        name: name,
        content: content
    }
});

export const deleteNote = (index) => ({
    type: DELETE_NOTE,
    payload: index
});

export const archiveNote = (index) => ({
    type: ARCHIVE_NOTE,
    payload: index
});

export const deArchiveNote = (index) => ({
    type: DEARCHIVE_NOTE,
    payload: index
});

export const changeMode = () => ({
    type: CHANGE_MODE
})

export const updateModalStatus = (status) => ({
    type: UPDATE_MODAL_STATUS,
    payload: status
})