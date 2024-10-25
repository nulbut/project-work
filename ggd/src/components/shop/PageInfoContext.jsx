import React, { createContext, useState } from "react";

export const PageContextStore = createContext();

const PageInfoContext = (props) => {
    const [searchProduct, setSearchProduct] = useState("title");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [pageNum, setPageNum] = useState(1);

    const pageStatus = {
        searchProduct,
        setSearchProduct,
        searchKeyword,
        setSearchKeyword,
        pageNum,
        setPageNum,
    };
    return (
        <PageContextStore.Provider value={pageStatus}>
            {props.children}
        </PageContextStore.Provider>
    );
};

export default PageInfoContext;