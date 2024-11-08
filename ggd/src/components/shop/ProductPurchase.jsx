import React from "react";


const ProductPurchase = () => {

    return (
        <form>
            <h2>상품 결제</h2>
            <div>
                <label>카드 정보 : </label>
                {/* <CardElement /> */}
            </div>
            <button type="submit"> 
                결제하기
            </button>
        </form>
    );
};
//onSubmit={handleSubmit}
//disabled={!stripe}
export default ProductPurchase;