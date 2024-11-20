import React from "react";

export default function CheckBox({ itemid, checked, checkItemHandler }) {
  const checkHandled = (e) => {
    console.log("checkHandled");
    checkItemHandler(e.target.id, e.target.checked);
  };
  return (
    <label>
      <input
        id={itemid}
        type="checkbox"
        checked={checked}
        onChange={checkHandled}
      />
    </label>
  );
}
