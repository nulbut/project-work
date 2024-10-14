import React from 'react';
import classNames from "classnames";

const ShopCategoryColum = ({children, span, wd}) => {
    return (
        <td className={classNames("CategoryColumn", wd)} colSpan={span}>
            {children}            
        </td>
    );
};

export default ShopCategoryColum;