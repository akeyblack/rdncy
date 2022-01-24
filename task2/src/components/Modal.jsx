import {React, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateModalStatus} from '../redux/actions';


function Modal() {
    const dispatch = useDispatch();
    const modalStatus = useSelector(state => state.modalStatus);

    const formRef = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateModalStatus(false, () => {}));
        modalStatus.callback(e.target.name.value, e.target.content.value,  e.target.type.value);
        formRef.current.reset();
    }

    const closeModal = () => {
        dispatch(updateModalStatus(false, () => {}));
    }

    return (
        <div style={{display: modalStatus.status ? "block" : "none"}} className="modal">
            <div className="modal__content">
                <span onClick={closeModal} className="modal__close"> &times; </span>
                <form ref={formRef} onSubmit={handleSubmit} className="modal__form">
                    <input placeholder="Place for name..." name="name" type="text" />
                    <input placeholder="Place for content..." name="content" type="text"/>
                    <select name="type">
                        <option value="Task">Task</option>
                        <option value="Random Thought">Random Thought</option>
                        <option value="Idea">Idea</option>
                    </select>
                    <button type="submit" className="btn btn-big">Submit</button>
                </form>
            </div>
        </div>  
    );
}

export default Modal;