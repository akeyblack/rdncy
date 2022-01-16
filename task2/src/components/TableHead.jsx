import React from 'react';

function TableHead(props) {
    return (
        <thead>
            <tr>
                {props.thArray.map( (el,i) =>
                    <th key={i} className={el.isImage ? "table__img" : ""}>
                        {el.iClass ? <i className={el.iClass}/> : (
                            el.text ? el.text : ""
                        )} 
                    </th>
                )}
            </tr>
        </thead>
    );
}

export default TableHead;