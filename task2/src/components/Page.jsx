import React from 'react';
import moment from 'moment';

import Modal from './Modal';
import Table from './Table';
import {useSelector, useDispatch} from 'react-redux';
import '../sass/style.scss';
import { updateModalStatus, changeMode, addNote} from '../redux/actions';
import { thArray1, thArray2 } from '../utils/arrays';

function Page() {
    const dispatch = useDispatch();
    const {array, archive, isArchive} = useSelector(state => ({
        array: state.array,
        archive: state.archive,
        isArchive: state.isArchive
    }));

    const getNumOf = (name, isActive) => {
        let items = isActive ? array : archive;
        return items.filter(x => x.type === name).length;
    } 

    const statsArray = ["Task", "Idea", "Random Thought"].map(el => ({
        type: el,
        active: getNumOf(el, true),
        archive: getNumOf(el, false)
    }));

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
                <Table thArray={thArray1} array={isArchive ? archive : array} type="" isArchive={isArchive}/>
            </div>
            <button className="btn btn-big" onClick={changeActiveMode}>Change mode</button>
            <Table thArray={thArray2} array={statsArray} type="stats" isArchive={false}/>
        </div>
    );
}

export default Page;