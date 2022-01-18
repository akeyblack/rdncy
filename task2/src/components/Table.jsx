import React from 'react';

import TableHead from './TableHead';
import TableRow from './TableRow';

function Table(props) {
    return (
        <table className={"table " + (props.type ? "table__" + props.type : "")}>
            <TableHead thArray={props.thArray}/>
            <tbody className={"table__content" + (props.isArchive ? "_archive" : "")}>
                {props.array.map( (el, i) =>
                    <TableRow isArchive={props.isArchive} key={i} index={i} item={el} type={props.type}/>
                )}
            </tbody>
        </table>
    );
}

export default Table;