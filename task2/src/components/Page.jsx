import React from 'react';
import moment from 'moment';

import Modal from './Modal';
import Table from './Table';
import {useSelector, useDispatch} from 'react-redux';
import '../sass/style.scss';
import { updateModalStatus, changeMode, addNote} from '../redux/actions';

function Page() {
    const dispatch = useDispatch();
    const {array, archive, isArchive, modalData} = useSelector(state => ({
        array: state.array,
        archive: state.archive,
        isArchive: state.isArchive,
        modalData: state.currentModalData
    }));

    const thArray1 = [
        { text: ""},
        { text: "Name"},
        { text: "Created"},
        { text: "Category"},
        { text: "Content"},
        { text: "Dates"},
        { text: ""},
        { iClass: "far fa-folder"},
        { iClass: "far fa-trash-alt"}
    ];  

    const thArray2 = [
        { text: "Note Category"},
        { text: "Active", isImage: true},
        { text: "Archive", isImage: true}
    ];

    const createNoteOnSubmit = (name, content, type) => {
        dispatch(addNote(name, content, type, moment().format("LL")))
    }

    const openCreateModal = () => {
        dispatch(updateModalStatus(true, createNoteOnSubmit));
    }

    const changeActiveMode = () => {
        dispatch(changeMode());
    }

    return (
        <div className="wrapper">
            <div>
                <button className="btn btn-big" onClick={openCreateModal}>Create Note</button>
            </div>
            <Modal/>
            <div className="table__wrapper">
                <Table thArray={thArray1} array={isArchive ? archive : array}/>
            </div>
            <button className="btn btn-big" onClick={changeActiveMode}>Change mode</button>
            <Table thArray={thArray2} array={[]}/>
        </div>
    );
}

export default Page;