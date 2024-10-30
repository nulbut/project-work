import React from 'react';
import classnames from "classnames";
import "../shop/scss/UsedButton.scss";

const UsedButton = (props) => {

    const {
        children,
        size = "medium",
        color = "blue",
        wsize = "basic",
        outline,
        ...rest
    } = props;

    return (
        <button
        classname={classnames("Button", size, color, wsize, { outline })}
        {...rest}
        >
        {children}
        </button>
    );
};

export default UsedButton;