import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, ARCHIVE_NOTE, 
    DEARCHIVE_NOTE, CHANGE_MODE, UPDATE_MODAL_STATUS } from "./actions";

class Note {
    constructor(name, content, type, created) {
        this.name = name;
        this.content = content;
        this.type = type;
        this.created = created;
        let dates = content.match(/(0?[1-9]|[12]\d|30|31)([/.-])(0?[1-9]|1[0-2])([/.-])(\d{4}|\d{2})/g);
        this.dates = dates ? dates.join(" ") : "";
    }
}

const deFaultState = {
    array: [
        new Note("Shopping List", "Tomatoes, break", "Task", "January 16, 2022"),
        new Note("The theory of evolution", "The evolution...", "Random Thought", "January 16, 2022"),
        new Note("New Feature", "Implement new something, 13/12/2021 , 25/12/2021", "Idea", "January 16, 2022"),
        new Note("William Gaddis", "Power doesn't...", "Random Thought", "January 16, 2022"),
        new Note("Books", "The Lean Startup", "Task", "January 16, 2022"),
        new Note("What if", "What if ", "Idea", "January 16, 2022"),
        new Note("Shopping List2", "Apples for 1/1/12", "Task", "January 16, 2022")
    ],
    archive: [],
    isArchive: false,
    modalStatus: {
        status: false,
        callback: () => {}
    }
}

export const reducer = (state = deFaultState, action) => {
    switch (action.type) {
        case ADD_NOTE:
            let note = new Note(action.payload.name, action.payload.content, action.payload.type, action.payload.created)
            return {
                ...state,
                array: [...state.array, note]
            }

        case UPDATE_NOTE:
            let newNote = new Note(action.payload.name, action.payload.content, action.payload.type, state.array[action.payload.index].created)
            return {
                ...state,
                array: state.array.map(
                    (el, i) => i === action.payload.index ? newNote : el
                )
            }

        case DELETE_NOTE:
            return {
                ...state,
                array: [
                    ...state.array.slice(0, action.payload), 
                    ...state.array.slice(action.payload + 1)
                ]
            }

        case ARCHIVE_NOTE:
            return {
                ...state,
                archive: [...state.archive, state.array[action.payload]],
                array: [
                    ...state.array.slice(0, action.payload), 
                    ...state.array.slice(action.payload + 1)
                ]
            }
        case DEARCHIVE_NOTE:
            return {
                ...state,
                archive: [...state.archive.slice(0, action.payload), ...state.archive.slice(action.payload + 1)],
                array: [...state.array, state.archive[action.payload]]
            }
        case CHANGE_MODE:
            return {
                ...state,
                isArchive: !state.isArchive
            }
        case UPDATE_MODAL_STATUS:
            return {
                ...state,
                modalStatus: action.payload
            }
        default:
            return state;
    }
}