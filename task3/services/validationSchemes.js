import * as yup from 'yup';
                 
export const createNoteSchema = yup.object({
    body: yup.object({
        name: yup.string().required("Name required").min(5, "Too short! (min 5)").max(100, "Too long! (max 100)"),
        content: yup.string().required("Content required").min(1, "Too short! (min 1)").max(100, "Too long! (max 100)"),
        category: yup.string().oneOf(["Idea", "Random Thought", "Task"], "Must be const value from list").required()
    })
});

export const updateNoteSchema = yup.object({
    body: yup.object({
        name: yup.string().required("Name required").min(5, "Too short! (min 5)").max(100, "Too long! (max 100)"),
        content: yup.string().required("Content required").min(1, "Too short! (min 1)").max(100, "Too long! (max 100)")
    }),
    params: yup.object({
        id: yup.number().integer().required("Id required")
    })
});

export const getByIdNoteSchema = yup.object({
    params: yup.object({
        id: yup.number().integer().required("Id required")
    })
});