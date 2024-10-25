import React from 'react';
import classNames from 'classnames';

const TableColumn = ({children, span, wd}) => {
    return (
        <td className={classNames("TableColumn", wd)} colSpan={span}>
            {children}
        </td>
    );
};

export default TableColumn;