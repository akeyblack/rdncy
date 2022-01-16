import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateModalStatus} from '../redux/actions';


function Modal() {
    const dispatch = useDispatch();
    const isModalActive = useSelector(state => state.isModalActive);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateModalStatus(false));
    }

    return (
        <div style={{display: isModalActive ? "block" : "none"}} className="modal">
        <div className="modal__content">
            <span onClick={() => dispatch(updateModalStatus(false))} className="modal__close">&times;</span>
            <form onSubmit={handleSubmit} className="modal__form">
                <input placeholder="Place for name..." name="name" type="text"/>
                <input placeholder="Place for content..." name="content" type="text"/>
                <select name="type">
                    <option value="Task">Task</option>
                    <option value="Random Thought">Random Thought</option>
                    <option value="Idea">Idea</option>
                </select>
                <button id="mdlSubmit" type="submit" className="btn btn-big">Submit</button>
            </form>
        </div>
        </div>  
    );
}

export default Modal;