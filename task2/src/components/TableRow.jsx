import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateNote, archiveNote, deArchiveNote, deleteNote} from '../redux/actions';

function TableRow(props) {
    const dispatch = useDispatch();

    const item = props.item;

    const openUpdateModalHandler = () => {

    }

    const archiveNoteHandler = () => {
        if (props.isArchive)
            dispatch(deArchiveNote(props.index))
        else
            dispatch(archiveNote(props.index))
    }

    const deleteNoteHandler  = () => {
        dispatch(deleteNote(props.index))
    }

    return (
        <tr>
            <td>
                <i className="fas fa-${this.getIcon(note.type)}"></i>
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
}

export default TableRow