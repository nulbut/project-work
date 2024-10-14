import React from 'react';
import classnames from "classnames";
import "./scss/Button.scss";

const Button = (props) => {

    const {
        children,
        ...rest
    } = props;
    return (
        <button
        classname={classnames("button")}
        {...rest}
        >
            {children}
        </button>
    );
};

export default Button;