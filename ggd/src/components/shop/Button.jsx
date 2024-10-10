import React from 'react';
import classnames from "classnames";

const Button = (props) => {

    const {
        children,
        ...rest
    } = props;
    return (
        <button
        classname={classnames("Button")}
        {...rest}
        >
            {children}
        </button>
    );
};

export default Button;