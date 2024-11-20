import React from "react";

const Radio = ({ children, value, name, defaultChecked, disabled }) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          value={value}
          name={name}
          defaultChecked={defaultChecked}
          disabled={disabled}
        />
        {children}
      </label>
    </div>
  );
};

export default Radio;
