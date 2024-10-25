import React from "react";
import "./scss/ProductTable.scss";

const ProductTable = ({ hName, children }) => {
    return (
        <div>
          <table className="Table">
            <thead>
            <tr>
                <th className="TableHeader w-10">{hName[0]}</th>
                <th className="TableHeader w-10">{hName[1]}</th>
                <th className="TableHeader w-10">{hName[2]}</th>
                <th className="TableHeader w-10">{hName[3]}</th>
                <th className="TableHeader w-10">{hName[4]}</th>
            </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
    );
};

export default ProductTable;