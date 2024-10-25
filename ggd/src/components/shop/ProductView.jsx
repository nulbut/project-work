import React from "react";
import "./scss/ProductView.scss";

const ProductView = ({ hName, children }) => {
    return (
        <div>
          <table className="Table">
            <thead>
            <tr>
                <th className="TableHeader w-10">{hName[0]}</th>
                <th className="TableHeader w-40">{hName[1]}</th>
                <th className="TableHeader w-20">{hName[2]}</th>
                <th className="TableHeader w-30">{hName[3]}</th>
            </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
    );
};

export default ProductView;