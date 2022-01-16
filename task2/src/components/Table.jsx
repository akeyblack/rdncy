import React from 'react';
import {useSelector} from 'react-redux';


import TableHead from './TableHead';
import TableRow from './TableRow';

function Table(props) {
    const isArchive = useSelector(state => state.isArchive);
    return (
        <table className="table">
            <TableHead thArray={props.thArray}/>
            <tbody className={"table__content" + (isArchive ? "_archive" : "")}>
                {props.array.map( (el, i) =>
                    <TableRow isArchive={isArchive} key={i} index={i} item={el}/>
                )}
            </tbody>
        </table>
    );
}

export default Table;