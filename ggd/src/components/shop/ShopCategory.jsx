import React from 'react';

const ShopCategory = ({hName}) => {
    return (
        <table className="Category">
            <thead>
                <tr>
                    <th className="Category w-10">{hName[0]}</th>
                    <th className="Category w-10">{hName[1]}</th>
                    <th className="Category w-10">{hName[2]}</th>
                    <th className="Category w-10">{hName[3]}</th>
                    <th className="Category w-10">{hName[4]}</th>
                    <th className="Category w-10">{hName[5]}</th>
                </tr>
            </thead>
        </table>
    );
};

export default ShopCategory;