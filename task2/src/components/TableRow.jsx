import React from 'react';
import {useDispatch} from 'react-redux';
import {updateNote, archiveNote, deArchiveNote, deleteNote, updateModalStatus} from '../redux/actions';

function TableRow(props) {
    const dispatch = useDispatch();

    const item = props.item;

    const updateNoteOnSubmit = (name , content, type) => {
        dispatch(updateNote(props.index, name, content, type));
    }

    const openUpdateModalHandler = () => {
        dispatch(updateModalStatus(true, updateNoteOnSubmit));
    }

    const archiveNoteHandler = () => {
        if (props.isArchive)
            dispatch(deArchiveNote(props.index));
        else
            dispatch(archiveNote(props.index));
    }

    const deleteNoteHandler  = () => {
        dispatch(deleteNote(props.index));
    }

    const getIcon = type => {
        switch(type) {
            case "Random Thought":
                return "random";
            case "Task":
                return "tasks";
            case "Idea":
                return "lightbulb";
            default:
                return "";
        }
    }

    switch(props.type) {
        case "stats":
            return (
                <tr>
                    <td>
                        <i className={"fas fa-" + getIcon(item.type)}></i>
                    </td>
                    <td><div>{item.type}</div></td>
                    <td><span>{item.active}</span></td>
                    <td><span>{item.archive}</span></td>
                </tr>
            );
        case "":
            return (
                <tr>
                    <td>
                        <i className={"fas fa-" + getIcon(item.type)}></i>
                    </td>
                    <td><div>{item.name}</div></td>
                    <td><div>{item.created}</div></td>
                    <td><div>{item.type}</div></td>
                    <td><div>{item.content}</div></td>
                    <td><div>{item.dates}</div></td>
                    <td>
                        <button onClick={openUpdateModalHandler} className="btn btn-small fas fa-pencil-alt"/>
                    </td>
                    <td>
                        <button onClick={archiveNoteHandler} className="btn btn-small btn-small_archive far fa-folder"/>
                    </td>
                    <td>
                        <button onClick={deleteNoteHandler} className="btn btn-small fas fa-trash-alt"/>
                    </td>
                </tr>
            );
        default:
            return <div>Nothing Here</div>;
    }
}

export default TableRow